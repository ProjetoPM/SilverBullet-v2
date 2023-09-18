import MongooseRepository from './mongooseRepository';
import MongooseQueryUtils from '../utils/mongooseQueryUtils';
import AuditLogRepository from './auditLogRepository';

import ActivityDurationEstimatesRepository from './activityDurationEstimatesRepository';
import ActivityListRepository from './activityListRepository';
import AssumptionLogRepository from './assumptionLogRepository';
import BenefitsManagementPlanRepository from './benefitsManagementPlanRepository';
import BusinessCaseRepository from './businessCaseRepository';
import ChangeRequestRepository from './changeRequestRepository';
import ClosedProcurementDocumentationRepository from './closedProcurementDocumentationRepository';
import CommunicationsManagementPlanRepository from './communicationsManagementPlanRepository';
import CostEstimatesRepository from './costEstimatesRepository';
import CostManagementPlanRepository from './costManagementPlanRepository';
import FinalReportRepository from './finalReportRepository';
import LessonLearnedRegisterRepository from './lessonLearnedRegisterRepository';
import ProcurementManagementPlanRepository from './procurementManagementPlanRepository';
import ProcurementStatementWorkRegisterRepository from './procurementStatementWorkRegisterRepository';
import ProjectCharterRepository from './projectCharterRepository';
import ProjectClosureRepository from './projectClosureRepository';
import ProjectManagementPlanRepository from './projectManagementPlanRepository';
import ProjectScopeStatementRepository from './projectScopeStatementRepository';
import QualityChecklistRepository from './qualityChecklistRepository';
import QualityManagementPlanRepository from './qualityManagementPlanRepository';
import RequirementDocumentationRepository from './requirementDocumentationRepository';
import RequirementsManagementPlanRepository from './requirementsManagementPlanRepository';
import ResourceBreakdownStructureRepository from './resourceBreakdownStructureRepository';
import ResourceManagementPlanRepository from './resourceManagementPlanRepository';
import ResourceRepository from './resourceRepository';
import ResourceRequirementsRepository from './resourceRequirementsRepository';
import RiskManagementPlanRepository from './riskManagementPlanRepository';
import RiskRegistrationRepository from './riskRegistrationRepository';
import ScheduleManagementPlanRepository from './scheduleManagementPlanRepository';
import ScheduleNetworkDiagramRepository from './scheduleNetworkDiagramRepository';
import ScopeManagementPlanRepository from './scopeManagementPlanRepository';
import StakeholderCalendarsRepository from './stakeholderCalendarsRepository';
import StakeholderRegistrationRepository from './stakeholderRegistrationRepository';
import TeamPerformanceEvaluationRepository from './teamPerformanceEvaluationRepository';
import WorkbreakdownStructureRepository from './workbreakdownStructureRepository';
import WorkPerformanceReportsRepository from './workPerformanceReportsRepository';

import User from '../models/user';
import Project from '../models/project';
import Settings from '../models/settings';
import Error404 from '../../errors/Error404';
import Error400 from '../../errors/Error400';
import { IRepositoryOptions } from './IRepositoryOptions';
import { IProject } from '../../interfaces';
import ProjectPerformanceMonitoringReportRepository from './projectPerformanceMonitoringReportRepository';
import IssueLogRepository from './issueLogRepository';


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

    await ProjectCharterRepository.destroyManyFromProjectId(id, options);
    await BusinessCaseRepository.destroyManyFromProjectId(id, options);
    await BenefitsManagementPlanRepository.destroyManyFromProjectId(id, options);
    await AssumptionLogRepository.destroyManyFromProjectId(id, options);
    await StakeholderRegistrationRepository.destroyManyFromProjectId(id, options);

    await ProjectManagementPlanRepository.destroyManyFromProjectId(id, options);
    await RequirementsManagementPlanRepository.destroyManyFromProjectId(id, options);
    await ScopeManagementPlanRepository.destroyManyFromProjectId(id, options);
    await ScheduleManagementPlanRepository.destroyManyFromProjectId(id, options);
    await ActivityListRepository.destroyManyFromProjectId(id, options);
    await CostManagementPlanRepository.destroyManyFromProjectId(id, options);
    await CostEstimatesRepository.destroyManyFromProjectId(id, options);
    await QualityManagementPlanRepository.destroyManyFromProjectId(id, options);
    await ResourceManagementPlanRepository.destroyManyFromProjectId(id, options);
    await CommunicationsManagementPlanRepository.destroyManyFromProjectId(id, options);
    await RiskManagementPlanRepository.destroyManyFromProjectId(id, options);
    await ProcurementManagementPlanRepository.destroyManyFromProjectId(id, options);
    await ProcurementStatementWorkRegisterRepository.destroyManyFromProjectId(id, options);
    // Missing Stakeholder Engagement Plan
    await RequirementDocumentationRepository.destroyManyFromProjectId(id, options);
    await ScheduleNetworkDiagramRepository.destroyManyFromProjectId(id, options);
    await ResourceRepository.destroyManyFromProjectId(id, options);
    await ResourceRequirementsRepository.destroyManyFromProjectId(id, options);
    await ActivityDurationEstimatesRepository.destroyManyFromProjectId(id, options);
    await ResourceBreakdownStructureRepository.destroyManyFromProjectId(id, options);
    await RiskRegistrationRepository.destroyManyFromProjectId(id, options);
    await ProjectScopeStatementRepository.destroyManyFromProjectId(id, options);
    await WorkbreakdownStructureRepository.destroyManyFromProjectId(id, options);
    await StakeholderCalendarsRepository.destroyManyFromProjectId(id, options);
    // Missing Risk Checklist

    await ProjectPerformanceMonitoringReportRepository.destroyManyFromProjectId(id, options);
    // Missing Deliverable Status
    await WorkPerformanceReportsRepository.destroyManyFromProjectId(id, options);
    await IssueLogRepository.destroyManyFromProjectId(id, options);
    await LessonLearnedRegisterRepository.destroyManyFromProjectId(id, options);
    await QualityChecklistRepository.destroyManyFromProjectId(id, options);
    await TeamPerformanceEvaluationRepository.destroyManyFromProjectId(id, options);

    await ChangeRequestRepository.destroyManyFromProjectId(id, options);
    // Missing Change Log
    await ClosedProcurementDocumentationRepository.destroyManyFromProjectId(id, options);

    await ProjectClosureRepository.destroyManyFromProjectId(id, options);
    await FinalReportRepository.destroyManyFromProjectId(id, options);


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
