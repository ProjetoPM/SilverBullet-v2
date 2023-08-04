import MongooseRepository from './mongooseRepository';
import MongooseQueryUtils from '../utils/mongooseQueryUtils';
import AuditLogRepository from './auditLogRepository';
import User from '../models/user';
import Project from '../models/project';
import Settings from '../models/settings';
import Error404 from '../../errors/Error404';
import ProjectCharter from '../models/projectCharter';
import BusinessCase from '../models/businessCase';
import BenefitsManagementPlan from '../models/benefitsManagementPlan';
import AssumptionLog from '../models/assumptionLog';
import StakeholderRegistration from '../models/stakeholderRegistration';
import ProjectManagementPlan from '../models/projectManagementPlan';
import RequirementsManagementPlan from '../models/requirementsManagementPlan';
import RequirementDocumentation from '../models/requirementDocumentation';
import ScopeManagementPlan from '../models/scopeManagementPlan';
import ScheduleManagementPlan from '../models/scheduleManagementPlan';
import ProjectScopeStatement from '../models/projectScopeStatement';
import WorkbreakdownStructure from '../models/workbreakdownStructure';
import ScheduleNetworkDiagram from '../models/scheduleNetworkDiagram';
import ActivityList from '../models/activityList';
import Resource from '../models/resource';
import ResourceRequirements from '../models/resourceRequirements';
import ActivityDurationEstimates from '../models/activityDurationEstimates';
import StakeholderCalendars from '../models/stakeholderCalendars';
import CostManagementPlan from '../models/costManagementPlan';
import CostEstimates from '../models/costEstimates';
import QualityManagementPlan from '../models/qualityManagementPlan';
import ResourceManagementPlan from '../models/resourceManagementPlan';
import ResourceBreakdownStructure from '../models/resourceBreakdownStructure';
import Error400 from '../../errors/Error400';
import { IRepositoryOptions } from './IRepositoryOptions';
import { IProject } from '../../interfaces';


class ProjectRepository {
  static async create(
    data: IProject,
    options: IRepositoryOptions,
  ) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    if (!currentTenant) {
      throw new Error400();
    }
    const currentUser =
      MongooseRepository.getCurrentUser(options);
    const [record] = await Project(options.database).create(
      [
        {
          ...data,
          tenant: currentTenant.id,
          createdBy: currentUser.id,
          updatedBy: currentUser.id,
        }
      ],
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.CREATE,
      record.id,
      data,
      {
        ...options,
        currentTenant,
      },
    );

    return this.findById(record.id, {
      ...options,
    });
  }

  static async update(
    id,
    data,
    options: IRepositoryOptions,
  ) {
    const record = await this.findById(id, options);
    if (!record) {
      throw new Error404();
    }

    await Project(options.database).updateOne(
      { _id: id },
      {
        ...data,
        updatedBy:
          MongooseRepository.getCurrentUser(options).id,
      },
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.UPDATE,
      id,
      data,
      options,
    );

    return await this.findById(id, options);
  }

  /**
   * Updates the Tenant Plan user.
   */
  static async updatePlanUser(
    id,
    planStripeCustomerId,
    planUserId,
    options: IRepositoryOptions,
  ) {
    const currentUser =
      MongooseRepository.getCurrentUser(options);

    const data = {
      planStripeCustomerId,
      planUserId,
      updatedBy: currentUser.id,
    };

    await Project(options.database).updateOne(
      { _id: id },
      data,
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.UPDATE,
      id,
      data,
      options,
    );

    return await this.findById(id, options);
  }

  static async destroy(id, options: IRepositoryOptions) {

    let record =
      await MongooseRepository.wrapWithSessionIfExists(
        Project(options.database).findById(id),
        options,
      );

    await Project(options.database).deleteOne(
      { _id: id },
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.DELETE,
      id,
      record,
      options,
    );

    await ProjectCharter(options.database).deleteMany(
      { project: id },
      options,
    );

    await BusinessCase(options.database).deleteMany(
      { project: id },
      options,
    );

    await BenefitsManagementPlan(
      options.database,
    ).deleteMany({ project: id }, options);

    await AssumptionLog(options.database).deleteMany(
      { project: id },
      options,
    );

    await StakeholderRegistration(
      options.database,
    ).deleteMany({ project: id }, options);

    await ProjectManagementPlan(
      options.database,
    ).deleteMany({ project: id }, options);

    await RequirementsManagementPlan(
      options.database,
    ).deleteMany({ project: id }, options);

    await RequirementDocumentation(
      options.database,
    ).deleteMany({ project: id }, options);

    await ScopeManagementPlan(options.database).deleteMany(
      { project: id },
      options,
    );

    await ScheduleManagementPlan(
      options.database,
    ).deleteMany({ project: id }, options);

    await ProjectScopeStatement(
      options.database,
    ).deleteMany({ project: id }, options);

    await WorkbreakdownStructure(
      options.database,
    ).deleteMany({ project: id }, options);

    await ScheduleNetworkDiagram(
      options.database,
    ).deleteMany({ project: id }, options);

    await ActivityList(options.database).deleteMany(
      { project: id },
      options,
    );

    await Resource(options.database).deleteMany(
      { project: id },
      options,
    );

    await ResourceRequirements(options.database).deleteMany(
      { project: id },
      options,
    );

    await ActivityDurationEstimates(
      options.database,
    ).deleteMany({ project: id }, options);

    await StakeholderCalendars(options.database).deleteMany(
      { project: id },
      options,
    );

    await CostManagementPlan(options.database).deleteMany(
      { project: id },
      options,
    );

    await CostEstimates(options.database).deleteMany(
      { project: id },
      options,
    );

    await QualityManagementPlan(
      options.database,
    ).deleteMany({ project: id }, options);

    await ResourceManagementPlan(
      options.database,
    ).deleteMany({ project: id }, options);

    await ResourceBreakdownStructure(
      options.database,
    ).deleteMany({ project: id }, options);

    await Settings(options.database).deleteMany(
      { tenant: id },
      options,
    );

    await User(options.database).updateMany(
      {},
      {
        $pull: {
          projects: { project: id },
        },
      },
      options,
    );
  }

  static async destroyAll(
    projects: Array<IProject>,
    options: IRepositoryOptions,
  ) {
    for (const project of projects) {
      this.destroy(project.project, options);
    }
  }

  static async count(filter, options: IRepositoryOptions) {
    return MongooseRepository.wrapWithSessionIfExists(
      Project(options.database).countDocuments(filter),
      options,
    );
  }

  static async findById(id, options: IRepositoryOptions) {
    const record =
      await MongooseRepository.wrapWithSessionIfExists(
        Project(options.database).findById(id),
        options,
      );

    if (!record) {
      return record;
    }

    const output = record.toObject
      ? record.toObject()
      : record;

    return output;
  }

  static async findAndCountAll(
    { filter, limit = 0, offset = 0, orderBy = '' },
    options: IRepositoryOptions,
  ) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);


    let criteriaAnd: any = [];

    criteriaAnd.push({
      tenant: currentTenant.id,
    });

    if (filter) {
      if (filter.id) {
        criteriaAnd.push({
          ['_id']: MongooseQueryUtils.uuid(filter.id),
        });
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (
          start !== undefined &&
          start !== null &&
          start !== ''
        ) {
          criteriaAnd.push({
            ['createdAt']: {
              $gte: start,
            },
          });
        }

        if (
          end !== undefined &&
          end !== null &&
          end !== ''
        ) {
          criteriaAnd.push({
            ['createdAt']: {
              $lte: end,
            },
          });
        }
      }
    }

    const sort = MongooseQueryUtils.sort(
      orderBy || 'createdAt_DESC',
    );

    const skip = Number(offset || 0) || undefined;
    const limitEscaped = Number(limit || 0) || undefined;
    const criteria = criteriaAnd.length
      ? { $and: criteriaAnd }
      : null;

    let rows = await Project(options.database)
      .find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort);

    const count = await Project(
      options.database,
    ).countDocuments(criteria);



    return { rows, count };
  }

  static async _createAuditLog(
    action,
    id,
    data,
    options: IRepositoryOptions,
  ) {
    await AuditLogRepository.log(
      {
        entityName: Project(options.database).modelName,
        entityId: id,
        action,
        values: data,
      },
      options,
    );
  }

  static _isUserInProject(user, projectId) {
    if (!user || !user.projects) {
      return false;
    }

    return user.projects.some(
      (projectUser) =>
        String(projectUser.project.id) ===
        String(projectId),
    );
  }
}

export default ProjectRepository;
