import MongooseRepository from './mongooseRepository';
import MongooseQueryUtils from '../utils/mongooseQueryUtils';
import AuditLogRepository from './auditLogRepository';
import ProcessReportRepository from './processReportRepository';
import WeeklyReport from '../models/weeklyReport';
import Error404 from '../../errors/Error404';
import Error400 from '../../errors/Error400';
import { IRepositoryOptions } from './IRepositoryOptions';
import {
  IProcessReport,
  IWeeklyReport,
} from '../../interfaces';
import { RequestWeeklyReport } from '../../services/weeklyReport/createService';
import { UpdateRequestWeeklyReport } from '../../services/weeklyReport/updateService';

class WeeklyReportRepository {
  static async create(
    data: RequestWeeklyReport,
    options: IRepositoryOptions,
  ) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    const { id: tenantId } = currentTenant;
    if (!tenantId) {
      throw new Error400();
    }

    const { id: projectId } =
      MongooseRepository.getCurrentProject(options);

    if (!projectId) {
      throw new Error400();
    }
    const currentUser =
      MongooseRepository.getCurrentUser(options);

    const [record] = await WeeklyReport(
      options.database,
    ).create(
      [
        {
          ...data,
          weeklyEvaluation: data.weeklyEvaluationId,
          project: projectId,
          tenant: tenantId,
          createdBy: currentUser.id,
          updatedBy: currentUser.id,
        },
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
    id: string,
    language: string,
    data: UpdateRequestWeeklyReport,
    options: IRepositoryOptions,
  ) {
    const currentUser =
      await MongooseRepository.getCurrentUser(options);

    const record = await this.findById(id, options);
    if (!record) {
      throw new Error404();
    }

    const isSameUser = record.createdBy == currentUser.id;
    if (!isSameUser) throw new Error400(language, 'tenant.weeklyReport.errors.notSameUser');

    await WeeklyReport(options.database).updateOne(
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

  static async updateScore(
    id: string,
    data,
    options: IRepositoryOptions,
  ) {

    const record = await this.findById(id, options);
    if (!record) {
      throw new Error404();
    }

    await WeeklyReport(options.database).updateOne(
      { _id: id },
      {
        score: data
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

    await WeeklyReport(options.database).updateOne(
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

  static async destroy(
    id: string,
    options: IRepositoryOptions,
  ) {
    let record =
      await MongooseRepository.wrapWithSessionIfExists(
        WeeklyReport(options.database).findById(id),
        options,
      );

    await WeeklyReport(options.database).deleteOne(
      { _id: id },
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.DELETE,
      id,
      record,
      options,
    );
  }

  static async destroyAll(
    weeklyReports: string[],
    options: IRepositoryOptions,
  ) {
    for (const weeklyReport of weeklyReports) {
      this.destroy(weeklyReport, options);
    }
  }

  static async count(filter, options: IRepositoryOptions) {
    return MongooseRepository.wrapWithSessionIfExists(
      WeeklyReport(options.database).countDocuments(filter),
      options,
    );
  }

  static async findById(id, options: IRepositoryOptions) {
    const record =
      await MongooseRepository.wrapWithSessionIfExists(
        WeeklyReport(options.database).findById(id).populate('project', 'id name'),
        options,
      );

    if (!record) return;

    const output = record.toObject
      ? record.toObject()
      : record;

    const { rows: processes }: { rows: IProcessReport[] } =
      await ProcessReportRepository.getProcessesByWeeklyReportId(
        id!,
        options,
      );

    output.processes = processes;

    return output;
  }

  static async findByUserId(options) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    const currentProject =
      MongooseRepository.getCurrentProject(options);

    const currentUser =
      MongooseRepository.getCurrentUser(options);

    const criteriaAnd: any = [
      {
        tenant: currentTenant.id,
      },
      {
        project: currentProject.id,
      },
      {
        createdBy: currentUser.id,
      },
    ];
    const criteria = { $and: criteriaAnd };

    let rows = await WeeklyReport(options.database)
      .find(criteria)
      .populate('weeklyEvaluation');

    const count = await WeeklyReport(
      options.database,
    ).countDocuments(criteria);

    return { rows, count };
  }

  static async getWeeklyReport(id: string, options) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    const criteriaAnd: any = [
      {
        tenant: currentTenant.id,
      },
      {
        _id: id,
      },
    ];
    const criteria = { $and: criteriaAnd };

    let newData: IWeeklyReport[] = [];
    let rows = await WeeklyReport(options.database)
      .find(criteria)
      .populate('weeklyEvaluation');

    for (let index = 0; index < rows.length; index++) {
      const { _id } = rows[index]._doc;

      const weeklyReport: IWeeklyReport = {
        ...rows[index]._doc,
      };

      const {
        rows: processes,
      }: { rows: IProcessReport[] } =
        await ProcessReportRepository.getProcessesByWeeklyReportId(
          _id!,
          options,
        );

      weeklyReport.processes = processes;
      newData.push(weeklyReport);
    }

    const count = await WeeklyReport(
      options.database,
    ).countDocuments(criteria);

    return { rows: newData, count };
  }

  static async getSubmissionsByTenant(options) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    const criteriaAnd: any = [
      {
        tenant: currentTenant.id,
      },
    ];
    const criteria = { $and: criteriaAnd };

    let newData: IWeeklyReport[] = [];
    let rows = await WeeklyReport(options.database)
      .find(criteria)
      .populate('weeklyEvaluation');

    for (let index = 0; index < rows.length; index++) {
      const { _id } = rows[index]._doc;

      const weeklyReport: IWeeklyReport = {
        ...rows[index]._doc,
      };

      const {
        rows: processes,
      }: { rows: IProcessReport[] } =
        await ProcessReportRepository.getProcessesByWeeklyReportId(
          _id!,
          options,
        );

      weeklyReport.processes = processes;
      newData.push(weeklyReport);
    }

    const count = await WeeklyReport(
      options.database,
    ).countDocuments(criteria);

    return { rows: newData, count };
  }

  static async getReportsByEvaluationId(
    weeklyEvaluationId: string,
    options: IRepositoryOptions,
  ) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    let criteriaAnd: any = [
      {
        tenant: currentTenant.id,
      },
      {
        weeklyEvaluation: weeklyEvaluationId
      }
    ];

    const criteria = criteriaAnd.length
      ? { $and: criteriaAnd }
      : null;

    let rows = await WeeklyReport(options.database)
      .find(criteria)

    const count = await WeeklyReport(
      options.database,
    ).countDocuments(criteria);

    return { rows, count };
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

    let rows = await WeeklyReport(options.database)
      .find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort);

    const count = await WeeklyReport(
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
        entityName: WeeklyReport(options.database)
          .modelName,
        entityId: id,
        action,
        values: data,
      },
      options,
    );
  }
}

export default WeeklyReportRepository;
