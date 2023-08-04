import MongooseRepository from './mongooseRepository';
import AuditLogRepository from './auditLogRepository';
import Tenant from '../models/tenant';
import { IRepositoryOptions } from './IRepositoryOptions';


export default class ProjectTenantRepository {

  private static entityName = 'tenant';

  static async create(
    project,
    options: IRepositoryOptions,
  ) {

    const currentTenant = MongooseRepository.getCurrentTenant(
      options,
    );

    const currentUser = MongooseRepository.getCurrentUser(
      options,
      );


   await Tenant(options.database).updateMany(
      { _id: currentTenant.id },
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
        entityId: currentTenant.id,
        action: AuditLogRepository.CREATE,
        values: {
          email: currentUser.email
        },
      },
      options,
    );
  }
  
  static async destroy(
    projectId,
    user,
    id,
    options: IRepositoryOptions,
  ) {
    const tenant = await MongooseRepository.wrapWithSessionIfExists(
      Tenant(options.database).findById(id),
      options,
    );

    await Tenant(options.database).updateOne(
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
        entityId: tenant.id,
        action: AuditLogRepository.DELETE,
        values: {
          email: user.email,
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
