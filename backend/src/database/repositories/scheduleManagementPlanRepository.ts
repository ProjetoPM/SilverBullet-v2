import MongooseRepository from './mongooseRepository';
import MongooseQueryUtils from '../utils/mongooseQueryUtils';
import AuditLogRepository from './auditLogRepository';
import Error404 from '../../errors/Error404';
import { IRepositoryOptions } from './IRepositoryOptions';
import lodash from 'lodash';
import ScheduleManagementPlan from '../models/scheduleManagementPlan';

class ScheduleManagementPlanRepository {
  
  static async create(data, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(
      options,
    );

    const currentUser = MongooseRepository.getCurrentUser(
      options,
    );

    const [record] = await ScheduleManagementPlan(
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
      ScheduleManagementPlan(options.database).findOne({_id: id, tenant: currentTenant.id}),
      options,
    );

    if (!record) {
      throw new Error404();
    }

    await ScheduleManagementPlan(options.database).updateOne(
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
      ScheduleManagementPlan(options.database).findOne({_id: id, tenant: currentTenant.id}),
      options,
    );

    if (!record) {
      throw new Error404();
    }

    await ScheduleManagementPlan(options.database).deleteOne({ _id: id }, options);

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

    const records = await ScheduleManagementPlan(options.database)
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
      ScheduleManagementPlan(options.database).countDocuments({
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
      ScheduleManagementPlan(options.database)
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

      if (filter.projectScheduleModelDevelopment) {
        criteriaAnd.push({
          projectScheduleModelDevelopment: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.projectScheduleModelDevelopment,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.levelAccuracy) {
        criteriaAnd.push({
          levelAccuracy: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.levelAccuracy,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.organizationalProceduresLinks) {
        criteriaAnd.push({
          organizationalProceduresLinks: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.organizationalProceduresLinks,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.projectScheduleModelMaintenance) {
        criteriaAnd.push({
          projectScheduleModelMaintenance: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.projectScheduleModelMaintenance,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.performanceMeasurementRules) {
        criteriaAnd.push({
          performanceMeasurementRules: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.performanceMeasurementRules,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.reportingFormats) {
        criteriaAnd.push({
          reportingFormats: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.reportingFormats,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.releaseIterationLength) {
        criteriaAnd.push({
          releaseIterationLength: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.releaseIterationLength,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.controlThresholds) {
        criteriaAnd.push({
          controlThresholds: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.controlThresholds,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.unitsMeasure) {
        criteriaAnd.push({
          unitsMeasure: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.unitsMeasure,
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
      orderBy || 'createdAt_DESC',
    );

    const skip = Number(offset || 0) || undefined;
    const limitEscaped = Number(limit || 0) || undefined;
    const criteria = criteriaAnd.length
      ? { $and: criteriaAnd }
      : null;

    let rows = await ScheduleManagementPlan(options.database)
      .find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort);

    const count = await ScheduleManagementPlan(
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
            projectScheduleModelDevelopment: {
              $regex: MongooseQueryUtils.escapeRegExp(search),
              $options: 'i',
            }
          },          
        ],
      });
    }

    const sort = MongooseQueryUtils.sort('projectScheduleModelDevelopment_ASC');
    const limitEscaped = Number(limit || 0) || undefined;

    const criteria = { $and: criteriaAnd };

    const records = await ScheduleManagementPlan(options.database)
      .find(criteria)
      .limit(limitEscaped)
      .sort(sort);

    return records.map((record) => ({
      id: record.id,
      label: record.projectScheduleModelDevelopment,
    }));
  }

  static async _createAuditLog(action, id, data, options: IRepositoryOptions) {
    await AuditLogRepository.log(
      {
        entityName: ScheduleManagementPlan(options.database).modelName,
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

export default ScheduleManagementPlanRepository;
