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

  static async findProjectsByUser(options){
    const currentUser = await MongooseRepository.getCurrentUser(options);

    const {id} = await MongooseRepository.getCurrentTenant(options);
    
    const user = await MongooseRepository.wrapWithSessionIfExists(
      User(options.database)
        .findById(currentUser.id)
        .populate('projects.project'),
      options,
    );
    
    const filteredProjects = user.projects.filter(project => {
      if(project.project.tenant == id && project.status == 'active'){
        return project;
      }
    })
    user.projects = filteredProjects;
    
    return user;
  }

  static async findByInvitationToken(
    invitationToken: string,
    options: IRepositoryOptions,
  ) {
    let user = await MongooseRepository.wrapWithSessionIfExists(
      User(options.database)
        .findOne({
          projects: { $elemMatch: { invitationToken } },
        })
        .populate('projects.project'),
      options,
    );

    if (!user) {
      return null;
    }

    user = user.toObject ? user.toObject() : user;

    const projectUser = user.projects.find((userProject) => {
      return userProject.invitationToken === invitationToken;
    });

    console.log(projectUser);
    

    return {
      ...projectUser,
      user,
    };
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

  static async acceptInvitation(
    invitationToken,
    options: IRepositoryOptions,
  ) {
    const currentUser = MongooseRepository.getCurrentUser(
      options,
    );

    // This tenant user includes the User data
    let invitationProjectUser = await this.findByInvitationToken(
      invitationToken,
      options,
    );

    let existingProjectUser = currentUser.projects.find(
      (userProject) =>
        String(userProject.project.id) ===
        String(invitationProjectUser.project.id),
    );

    // destroys old invite just for sure
    await this.destroy(
      invitationProjectUser.project.id,
      invitationProjectUser.user.id,
      options,
    );

    const projectUser = {
      project: invitationProjectUser.project.id,
      invitationToken: null,
      status: selectStatus(
        'active',
        invitationProjectUser.roles,
      ),
      roles: invitationProjectUser.roles,
    };

    // In case the user is already a member, should merge the roles
    if (existingProjectUser) {
      // Merges the roles from the invitation and the current tenant user
      projectUser.roles = [
        ...new Set([
          ...existingProjectUser.roles,
          ...invitationProjectUser.roles,
        ]),
      ];
    }

    await User(options.database).updateOne(
      { _id: currentUser.id },
      {
 
        $push: {
          projects: projectUser,
        },
      },
      options,
    );

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: currentUser.id,
        action: AuditLogRepository.UPDATE,
        values: {
          email: currentUser.email,
          roles: projectUser.roles,
          status: selectStatus('active', projectUser.roles),
        },
      },
      options,
    );
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
