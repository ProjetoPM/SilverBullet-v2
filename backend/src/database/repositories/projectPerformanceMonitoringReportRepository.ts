import MongooseRepository from './mongooseRepository';
import MongooseQueryUtils from '../utils/mongooseQueryUtils';
import AuditLogRepository from './auditLogRepository';
import Error404 from '../../errors/Error404';
import { IRepositoryOptions } from './IRepositoryOptions';
import lodash from 'lodash';
import ProjectPerformanceMonitoringReport from '../models/projectPerformanceMonitoringReport';

class ProjectPerformanceMonitoringReportRepository {
  
  static async create(data, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(
      options,
    );

    const currentUser = MongooseRepository.getCurrentUser(
      options,
    );

    const [record] = await ProjectPerformanceMonitoringReport(
      options.database,
    ).create(
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
      options,
    );

    

    return this.findById(record.id, options);
  }

  static async update(id, data, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(
      options,
    );

    let record = await MongooseRepository.wrapWithSessionIfExists(
      ProjectPerformanceMonitoringReport(options.database).findOne({_id: id, tenant: currentTenant.id}),
      options,
    );

    if (!record) {
      throw new Error404();
    }

    await ProjectPerformanceMonitoringReport(options.database).updateOne(
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

    record = await this.findById(id, options);



    return record;
  }

  static async destroy(id, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(
      options,
    );

    let record = await MongooseRepository.wrapWithSessionIfExists(
      ProjectPerformanceMonitoringReport(options.database).findOne({_id: id, tenant: currentTenant.id}),
      options,
    );

    if (!record) {
      throw new Error404();
    }

    await ProjectPerformanceMonitoringReport(options.database).deleteOne({ _id: id }, options);

    await this._createAuditLog(
      AuditLogRepository.DELETE,
      id,
      record,
      options,
    );


  }

  static async filterIdInTenant(
    id,
    options: IRepositoryOptions,
  ) {
    return lodash.get(
      await this.filterIdsInTenant([id], options),
      '[0]',
      null,
    );
  }

  static async filterIdsInTenant(
    ids,
    options: IRepositoryOptions,
  ) {
    if (!ids || !ids.length) {
      return [];
    }

    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    const records = await ProjectPerformanceMonitoringReport(options.database)
      .find({
        _id: { $in: ids },
        tenant: currentTenant.id,
      })
      .select(['_id']);

    return records.map((record) => record._id);
  }

  static async count(filter, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(
      options,
    );

    return MongooseRepository.wrapWithSessionIfExists(
      ProjectPerformanceMonitoringReport(options.database).countDocuments({
        ...filter,
        tenant: currentTenant.id,
      }),
      options,
    );
  }

  static async findById(id, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(
      options,
    );

    let record = await MongooseRepository.wrapWithSessionIfExists(
      ProjectPerformanceMonitoringReport(options.database)
        .findOne({_id: id, tenant: currentTenant.id}),
      options,
    );

    if (!record) {
      throw new Error404();
    }

    return this._mapRelationshipsAndFillDownloadUrl(record);
  }

  static async findAndCountAll(
    { filter, limit = 0, offset = 0, orderBy = '' },
    options: IRepositoryOptions,
  ) {
    const currentTenant = MongooseRepository.getCurrentTenant(
      options,
    );

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

      if (filter.currentPerformanceAnalysis) {
        criteriaAnd.push({
          currentPerformanceAnalysis: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.currentPerformanceAnalysis,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.forecastsAsPlanned) {
        criteriaAnd.push({
          forecastsAsPlanned: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.forecastsAsPlanned,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.forecastsConsideringCurrentlyPerformance) {
        criteriaAnd.push({
          forecastsConsideringCurrentlyPerformance: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.forecastsConsideringCurrentlyPerformance,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.currentRiskSituation) {
        criteriaAnd.push({
          currentRiskSituation: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.currentRiskSituation,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.currentStatusIssues) {
        criteriaAnd.push({
          currentStatusIssues: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.currentStatusIssues,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.workCompletedDuringPeriod) {
        criteriaAnd.push({
          workCompletedDuringPeriod: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.workCompletedDuringPeriod,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.workToBeCompletedNextPeriod) {
        criteriaAnd.push({
          workToBeCompletedNextPeriod: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.workToBeCompletedNextPeriod,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.summaryChangesApprovedInThePeriod) {
        criteriaAnd.push({
          summaryChangesApprovedInThePeriod: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.summaryChangesApprovedInThePeriod,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.earnedValueManagement) {
        criteriaAnd.push({
          earnedValueManagement: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.earnedValueManagement,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.otherRelevantInformation) {
        criteriaAnd.push({
          otherRelevantInformation: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.otherRelevantInformation,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.dateReportRange) {
        const [start, end] = filter.dateReportRange;

        if (start !== undefined && start !== null && start !== '') {
          criteriaAnd.push({
            dateReport: {
              $gte: start,
            },
          });
        }

        if (end !== undefined && end !== null && end !== '') {
          criteriaAnd.push({
            dateReport: {
              $lte: end,
            },
          });
        }
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

    let rows = await ProjectPerformanceMonitoringReport(options.database)
      .find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort);

    const count = await ProjectPerformanceMonitoringReport(
      options.database,
    ).countDocuments(criteria);

    rows = await Promise.all(
      rows.map(this._mapRelationshipsAndFillDownloadUrl),
    );

    return { rows, count };
  }

  static async findAllAutocomplete(search, limit, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(
      options,
    );

    let criteriaAnd: Array<any> = [{
      tenant: currentTenant.id,
    }];

    if (search) {
      criteriaAnd.push({
        $or: [
          {
            _id: MongooseQueryUtils.uuid(search),
          },
          {
            currentPerformanceAnalysis: {
              $regex: MongooseQueryUtils.escapeRegExp(search),
              $options: 'i',
            }
          },          
        ],
      });
    }

    const sort = MongooseQueryUtils.sort('currentPerformanceAnalysis_ASC');
    const limitEscaped = Number(limit || 0) || undefined;

    const criteria = { $and: criteriaAnd };

    const records = await ProjectPerformanceMonitoringReport(options.database)
      .find(criteria)
      .limit(limitEscaped)
      .sort(sort);

    return records.map((record) => ({
      id: record.id,
      label: record.currentPerformanceAnalysis,
    }));
  }

  static async _createAuditLog(action, id, data, options: IRepositoryOptions) {
    await AuditLogRepository.log(
      {
        entityName: ProjectPerformanceMonitoringReport(options.database).modelName,
        entityId: id,
        action,
        values: data,
      },
      options,
    );
  }

  static async _mapRelationshipsAndFillDownloadUrl(record) {
    if (!record) {
      return null;
    }

    const output = record.toObject
      ? record.toObject()
      : record;





    return output;
  }
}

export default ProjectPerformanceMonitoringReportRepository;
