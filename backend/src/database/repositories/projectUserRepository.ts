import MongooseRepository from './mongooseRepository';
import AuditLogRepository from './auditLogRepository';
import User from '../models/user';
import { IRepositoryOptions } from './IRepositoryOptions';
import { IProject } from '../../interfaces';

export default class ProjectUserRepository {
  private static entityName = 'user';

  static async create(
    project: IProject,
    options: IRepositoryOptions,
  ) {
    const currentUser =
      MongooseRepository.getCurrentUser(options);

    await User(options.database).updateMany(
      { _id: currentUser.id },
      {
        $push: {
          projects: {
            project: project.id,
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
