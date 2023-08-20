import MongooseRepository from './mongooseRepository';
import AuditLogRepository from './auditLogRepository';
import User from '../models/user';
import { IRepositoryOptions } from './IRepositoryOptions';
import { IProject } from '../../interfaces';
import crypto from 'crypto';


export default class ProjectUserRepository {
  private static entityName = 'user';

  static async create(
    project: IProject,
    options: IRepositoryOptions,
    roles: Array<string>
  ) {
    const currentUser =
      MongooseRepository.getCurrentUser(options);
    const status = selectStatus('active', roles);


    await User(options.database).updateMany(
      { _id: currentUser.id },
      {
        $push: {
          projects: {
            project: project.id,
            status,
            roles
          },
        },
      },
      options,
    );

    await AuditLogRepository.log(
      {
        entityName: this.entityName,
        entityId: currentUser.id,
        action: AuditLogRepository.CREATE,
        values: {
          email: currentUser.email,
        },
      },
      options,
    );
  }

  static async updateRoles(projectId, id, roles, options) {
    const user = await MongooseRepository.wrapWithSessionIfExists(
      User(options.database)
        .findById(id)
        .populate('projects.project'),
      options,
    );

    let projectUser = user.projects.find((userProject) => {
      return userProject.project.id === projectId;
    });

    let isCreation = false;

    if (!projectUser) {
      isCreation = true;
      projectUser = {
        project: projectId,
        status: selectStatus('invited', []),
        invitationToken: crypto
          .randomBytes(20)
          .toString('hex'),
        roles: roles,
      };

      await User(options.database).updateOne(
        { _id: id },
        {
          $push: {
            projects: projectUser,
          },
        },
        options,
      );
    }

    let { roles: existingRoles } = projectUser;

    let newRoles = [] as Array<string>;

    if (options.addRoles) {
      newRoles = [...new Set([...existingRoles, ...roles])];
    } else if (options.removeOnlyInformedRoles) {
      newRoles = existingRoles.filter(
        (existingRole) => !roles.includes(existingRole),
      );
    } else {
      newRoles = roles || [];
    }

    projectUser.roles = newRoles;
    projectUser.status = selectStatus(
      projectUser.status,
      newRoles,
    );

    await User(options.database).updateOne(
      { _id: id, 'projects.project': projectId },
      {
        $set: {
          'projects.$.roles': newRoles,
          'projects.$.status': projectUser.status,
        },
      },
      options,
    );

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: user.id,
        action: isCreation
          ? AuditLogRepository.CREATE
          : AuditLogRepository.UPDATE,
        values: {
          email: user.email,
          status: projectUser.status,
          roles: newRoles,
        },
      },
      options,
    );

    return projectUser;
  }

  static async destroy(
    projectId: String,
    id: String,
    options: IRepositoryOptions,
  ) {
    const currentUser =
      MongooseRepository.getCurrentUser(options);

    await User(options.database).updateOne(
      { _id: id },
      {
        $pull: {
          projects: { project: projectId },
        },
      },
      options,
    );

    await AuditLogRepository.log(
      {
        entityName: this.entityName,
        entityId: currentUser.id,
        action: AuditLogRepository.DELETE,
        values: {
          email: currentUser.email,
        },
      },
      options,
    );
  }
}

function selectStatus(oldStatus, newRoles) {
  newRoles = newRoles || [];

  if (oldStatus === 'invited') {
    return oldStatus;
  }

  if (!newRoles.length) {
    return 'empty-permissions';
  }

  return 'active';
}
