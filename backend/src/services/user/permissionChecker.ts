import assert from 'assert';
import Error403 from '../../errors/Error403';
import Plans from '../../security/plans';
import Permissions from '../../security/permissions';
import EmailSender from '../emailSender';

const plans = Plans.values;

export type IPermission = {
  id: string;
  allowedRoles: string[];
  allowedProjectRoles?: string[];
  allowedPlans: string[];
};

/**
 * Checks the Permission of the User on a Tenant.
 */
export default class PermissionChecker {
  currentTenant;
  language;
  currentUser;
  currentProject;

  constructor({
    currentTenant,
    language,
    currentUser,
    currentProject = null,
  }) {
    this.currentTenant = currentTenant;
    this.language = language;
    this.currentUser = currentUser;
    this.currentProject = currentProject;
  }

  /**
   * Validates if the user has a specific permission
   * and throws a Error403 if it doesn't.
   */
  validateHas(permission: IPermission) {
    if (!this.has(permission)) {
      throw new Error403(this.language);
    }
  }

  /**
   * Checks if the user has a specific permission.
   */
  has(permission) {
    assert(permission, 'permission is required');

    if (!this.isEmailVerified) {
      return false;
    }

    if (!this.hasPlanPermission(permission)) {
      return false;
    }

    if(this.hasRolePermission(permission)){
      return true;
    } 
    
    return this.hasProjectRolePermission(permission);
    

  }

  /**
   * Validates if the user has access to a storage
   * and throws a Error403 if it doesn't.
   */
  validateHasStorage(storageId) {
    if (!this.hasStorage(storageId)) {
      throw new Error403(this.language);
    }
  }

  /**
   * Validates if the user has access to a storage.
   */
  hasStorage(storageId: string) {
    assert(storageId, 'storageId is required');
    return this.allowedStorageIds().includes(storageId);
  }

  /**
   * Checks if the current user roles allows the permission.
   */
  hasRolePermission(permission) {
    return this.currentUserRolesIds.some((role) =>
      permission.allowedRoles.some(
        (allowedRole) => allowedRole === role,
      ),
    );
  }

  /**
   * Checks if the current user roles allows the permission.
   */
  hasProjectRolePermission(permission) {
    return this.currentUserProjectRolesIds.some((role) =>
      permission.allowedProjectRoles.some(
        (allowedRole) => allowedRole === role,
      ),
    );
  }

  /**
   * Checks if the current company plan allows the permission.
   */
  hasPlanPermission(permission) {
    assert(permission, 'permission is required');

    return permission.allowedPlans.includes(
      this.currentTenantPlan,
    );
  }

  get isEmailVerified() {
    // Only checks if the email is verified
    // if the email system is on
    if (!EmailSender.isConfigured) {
      return true;
    }

    return this.currentUser.emailVerified;
  }

  /**
   * Returns the Current User Roles.
   */
  get currentUserRolesIds() {
    if (!this.currentUser || !this.currentUser.tenants) {
      return [];
    }

    const tenant = this.currentUser.tenants
      .filter(
        (tenantUser) => tenantUser.status === 'active',
      )
      .find((tenantUser) => {
        return (
          tenantUser.tenant.id === this.currentTenant.id
        );
      });

    if (!tenant) {
      return [];
    }

    return tenant.roles;
  }

  /**
   * Returns the Current User Project Roles.
   */
  get currentUserProjectRolesIds() {
    if (!this.currentUser || !this.currentUser.projects) {
      return [];
    }

    const project = this.currentUser.projects
      .filter(
        (projectUser) => projectUser.status === 'active',
      )
      .find((projectUser) => {
        return (
          projectUser.project.id === this.currentProject.id
        );
      });

    if (!project) {
      return [];
    }

    return project.roles;
  }

  /**
   * Return the current tenant plan,
   * check also if it's not expired.
   */
  get currentTenantPlan() {
    if (!this.currentTenant || !this.currentTenant.plan) {
      return plans.free;
    }

    return this.currentTenant.plan;
  }

  /**
   * Returns the allowed storage ids for the user.
   */
  allowedStorageIds() {
    let allowedStorageIds: Array<string> = [];

    Permissions.asArray.forEach((permission) => {
      if (this.has(permission)) {
        allowedStorageIds = allowedStorageIds.concat(
          (permission.allowedStorage || []).map(
            (storage) => storage.id,
          ),
        );
      }
    });

    return [...new Set(allowedStorageIds)];
  }
}
