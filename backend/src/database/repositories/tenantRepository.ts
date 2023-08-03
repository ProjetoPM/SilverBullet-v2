import MongooseRepository from './mongooseRepository';
import MongooseQueryUtils from '../utils/mongooseQueryUtils';
import AuditLogRepository from './auditLogRepository';
import User from '../models/user';
import Tenant from '../models/tenant';
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
import CommunicationsManagementPlan from '../models/communicationsManagementPlan';
import RiskManagementPlan from '../models/riskManagementPlan';
import RiskRegistration from '../models/riskRegistration';
import ProcurementManagementPlan from '../models/procurementManagementPlan';
import ProcurementStatementWorkRegister from '../models/procurementStatementWorkRegister';
import ProjectPerformanceMonitoringReport from '../models/projectPerformanceMonitoringReport';
import WorkPerformanceReports from '../models/workPerformanceReports';
import IssueLog from '../models/issueLog';
import LessonLearnedRegister from '../models/lessonLearnedRegister';
import QualityChecklist from '../models/qualityChecklist';
import TeamPerformanceEvaluation from '../models/teamPerformanceEvaluation';
import ChangeRequest from '../models/changeRequest';
import ProjectClosure from '../models/projectClosure';
import ClosedProcurementDocumentation from '../models/closedProcurementDocumentation';
import FinalReport from '../models/finalReport';
import Error400 from '../../errors/Error400';
import { v4 as uuid } from 'uuid';
import { isUserInTenant } from '../utils/userTenantUtils';
import SettingsRepository from './settingsRepository';
import { IRepositoryOptions } from './IRepositoryOptions';

const forbiddenTenantUrls = ['www'];

class TenantRepository {
  static async create(data, options: IRepositoryOptions) {
    const currentUser = MongooseRepository.getCurrentUser(
      options,
    );

    // URL is required,
    // in case of multi tenant without subdomain
    // set a random uuid
    data.url = data.url || uuid();

    const existsUrl = Boolean(
      await this.count({ url: data.url }, options),
    );

    if (
      forbiddenTenantUrls.includes(data.url) ||
      existsUrl
    ) {
      throw new Error400(
        options.language,
        'tenant.url.exists',
      );
    }

    const [record] = await Tenant(options.database).create(
      [
        {
          ...data,
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
        currentTenant: record,
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
    const currentUser = MongooseRepository.getCurrentUser(
      options,
    );

    if (!isUserInTenant(currentUser, id)) {
      throw new Error404();
    }

    const record = await this.findById(id, options);

    // When not multi-with-subdomain, the
    // from passes the URL as undefined.
    // This way it's ensured that the URL will
    // remain the old one
    data.url = data.url || record.url;

    const existsUrl = Boolean(
      await this.count(
        { url: data.url, _id: { $ne: id } },
        options,
      ),
    );

    if (
      forbiddenTenantUrls.includes(data.url) ||
      existsUrl
    ) {
      throw new Error400(
        options.language,
        'tenant.url.exists',
      );
    }

    // Does not allow user to update the plan
    // only by updating the tenant
    delete data.plan;
    delete data.planStripeCustomerId;
    delete data.planUserId;
    delete data.planStatus;

    await Tenant(options.database).updateOne(
      { _id: id },
      {
        ...data,
        updatedBy: MongooseRepository.getCurrentUser(
          options,
        ).id,
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
    const currentUser = MongooseRepository.getCurrentUser(
      options,
    );

    const data = {
      planStripeCustomerId,
      planUserId,
      updatedBy: currentUser.id,
    };

    await Tenant(options.database).updateOne(
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

  static async updatePlanStatus(
    planStripeCustomerId,
    plan,
    planStatus,
    options: IRepositoryOptions,
  ) {
    const data = {
      plan,
      planStatus,
      updatedBy: null,
    };

    const record = await MongooseRepository.wrapWithSessionIfExists(
      Tenant(options.database).findOne({
        planStripeCustomerId,
      }),
      options,
    );

    await Tenant(options.database).updateOne(
      { _id: record.id },
      data,
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.UPDATE,
      record.id,
      data,
      options,
    );

    return await this.findById(record.id, options);
  }

  static async destroy(id, options: IRepositoryOptions) {
    const currentUser = MongooseRepository.getCurrentUser(
      options,
    );

    if (!isUserInTenant(currentUser, id)) {
      throw new Error404();
    }

    let record = await MongooseRepository.wrapWithSessionIfExists(
      Tenant(options.database).findById(id),
      options,
    );

    await Tenant(options.database).deleteOne(
      { _id: id },
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.DELETE,
      id,
      record,
      options,
    );

    await ProjectCharter(options.database).deleteMany({ tenant: id }, options);

    await BusinessCase(options.database).deleteMany({ tenant: id }, options);

    await BenefitsManagementPlan(options.database).deleteMany({ tenant: id }, options);

    await AssumptionLog(options.database).deleteMany({ tenant: id }, options);

    await StakeholderRegistration(options.database).deleteMany({ tenant: id }, options);

    await ProjectManagementPlan(options.database).deleteMany({ tenant: id }, options);

    await RequirementsManagementPlan(options.database).deleteMany({ tenant: id }, options);

    await RequirementDocumentation(options.database).deleteMany({ tenant: id }, options);

    await ScopeManagementPlan(options.database).deleteMany({ tenant: id }, options);

    await ScheduleManagementPlan(options.database).deleteMany({ tenant: id }, options);

    await ProjectScopeStatement(options.database).deleteMany({ tenant: id }, options);

    await WorkbreakdownStructure(options.database).deleteMany({ tenant: id }, options);

    await ScheduleNetworkDiagram(options.database).deleteMany({ tenant: id }, options);

    await ActivityList(options.database).deleteMany({ tenant: id }, options);

    await Resource(options.database).deleteMany({ tenant: id }, options);

    await ResourceRequirements(options.database).deleteMany({ tenant: id }, options);

    await ActivityDurationEstimates(options.database).deleteMany({ tenant: id }, options);

    await StakeholderCalendars(options.database).deleteMany({ tenant: id }, options);

    await CostManagementPlan(options.database).deleteMany({ tenant: id }, options);

    await CostEstimates(options.database).deleteMany({ tenant: id }, options);

    await QualityManagementPlan(options.database).deleteMany({ tenant: id }, options);

    await ResourceManagementPlan(options.database).deleteMany({ tenant: id }, options);

    await ResourceBreakdownStructure(options.database).deleteMany({ tenant: id }, options);

    await CommunicationsManagementPlan(options.database).deleteMany({ tenant: id }, options);

    await RiskManagementPlan(options.database).deleteMany({ tenant: id }, options);

    await RiskRegistration(options.database).deleteMany({ tenant: id }, options);

    await ProcurementManagementPlan(options.database).deleteMany({ tenant: id }, options);

    await ProcurementStatementWorkRegister(options.database).deleteMany({ tenant: id }, options);

    await ProjectPerformanceMonitoringReport(options.database).deleteMany({ tenant: id }, options);

    await WorkPerformanceReports(options.database).deleteMany({ tenant: id }, options);

    await IssueLog(options.database).deleteMany({ tenant: id }, options);

    await LessonLearnedRegister(options.database).deleteMany({ tenant: id }, options);

    await QualityChecklist(options.database).deleteMany({ tenant: id }, options);

    await TeamPerformanceEvaluation(options.database).deleteMany({ tenant: id }, options);

    await ChangeRequest(options.database).deleteMany({ tenant: id }, options);

    await ProjectClosure(options.database).deleteMany({ tenant: id }, options);

    await ClosedProcurementDocumentation(options.database).deleteMany({ tenant: id }, options);

    await FinalReport(options.database).deleteMany({ tenant: id }, options);

    await Settings(options.database).deleteMany(
      { tenant: id },
      options,
    );

    await User(options.database).updateMany(
      {},
      {
        $pull: {
          tenants: { tenant: id },
        },
      },
      options,
    );
  }

  static async count(filter, options: IRepositoryOptions) {
    return MongooseRepository.wrapWithSessionIfExists(
      Tenant(options.database).countDocuments(filter),
      options,
    );
  }

  static async findById(id, options: IRepositoryOptions) {
    const record = await MongooseRepository.wrapWithSessionIfExists(
      Tenant(options.database).findById(id),
      options,
    );

    if (!record) {
      return record;
    }

    const output = record.toObject
      ? record.toObject()
      : record;

    output.settings = await SettingsRepository.find({
      currentTenant: record,
      ...options,
    });

    return output;
  }

  static async findByUrl(url, options: IRepositoryOptions) {
    const record = await MongooseRepository.wrapWithSessionIfExists(
      Tenant(options.database).findOne({ url }),
      options,
    );

    if (!record) {
      return null;
    }

    const output = record.toObject
      ? record.toObject()
      : record;

    output.settings = await SettingsRepository.find({
      currentTenant: record,
      ...options,
    });

    return output;
  }

  static async findDefault(options: IRepositoryOptions) {
    return Tenant(options.database).findOne();
  }

  static async findAndCountAll(
    { filter, limit = 0, offset = 0, orderBy = '' },
    options: IRepositoryOptions,
  ) {
    const currentUser = MongooseRepository.getCurrentUser(
      options,
    );

    let criteriaAnd: any = [];

    criteriaAnd.push({
      _id: {
        $in: currentUser.tenants
          .filter((userTenant) =>
            ['invited', 'active'].includes(
              userTenant.status,
            ),
          )
          .map((userTenant) => userTenant.tenant.id),
      },
    });

    if (filter) {
      if (filter.id) {
        criteriaAnd.push({
          ['_id']: MongooseQueryUtils.uuid(filter.id),
        });
      }

      if (filter.name) {
        criteriaAnd.push({
          name: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.name,
            ),
            $options: 'i',
          },
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
      orderBy || 'name_ASC',
    );

    const skip = Number(offset || 0) || undefined;
    const limitEscaped = Number(limit || 0) || undefined;
    const criteria = criteriaAnd.length
      ? { $and: criteriaAnd }
      : null;

    const rows = await Tenant(options.database)
      .find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort);

    const count = await Tenant(
      options.database,
    ).countDocuments(criteria);

    return { rows, count };
  }

  static async findAllAutocomplete(
    search,
    limit,
    options: IRepositoryOptions,
  ) {
    const currentUser = MongooseRepository.getCurrentUser(
      options,
    );

    let criteriaAnd: Array<any> = [
      {
        _id: {
          $in: currentUser.tenants.map(
            (userTenant) => userTenant.tenant.id,
          ),
        },
      },
    ];

    if (search) {
      criteriaAnd.push({
        $or: [
          {
            _id: MongooseQueryUtils.uuid(search),
          },
          {
            name: {
              $regex: MongooseQueryUtils.escapeRegExp(
                search,
              ),
              $options: 'i',
            },
          },
        ],
      });
    }

    const sort = MongooseQueryUtils.sort('name_ASC');
    const limitEscaped = Number(limit || 0) || undefined;

    const criteria = { $and: criteriaAnd };

    const records = await Tenant(options.database)
      .find(criteria)
      .limit(limitEscaped)
      .sort(sort);

    return records.map((record) => ({
      id: record.id,
      label: record['name'],
    }));
  }

  static async _createAuditLog(
    action,
    id,
    data,
    options: IRepositoryOptions,
  ) {
    await AuditLogRepository.log(
      {
        entityName: Tenant(options.database).modelName,
        entityId: id,
        action,
        values: data,
      },
      options,
    );
  }

  static _isUserInTenant(user, tenantId) {
    if (!user || !user.tenants) {
      return false;
    }

    return user.tenants.some(
      (tenantUser) =>
        String(tenantUser.tenant.id) === String(tenantId),
    );
  }
}

export default TenantRepository;
