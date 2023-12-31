import MongooseRepository from './mongooseRepository';
import MongooseQueryUtils from '../utils/mongooseQueryUtils';
import AuditLogRepository from './auditLogRepository';
import Error404 from '../../errors/Error404';
import { IRepositoryOptions } from './IRepositoryOptions';
import lodash from 'lodash';
import ProcurementManagementPlan from '../models/procurementManagementPlan';

class ProcurementManagementPlanRepository {
  
  static async create(data, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(
      options,
    );

    const currentUser = MongooseRepository.getCurrentUser(
      options,
    );

    const [record] = await ProcurementManagementPlan(
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
      ProcurementManagementPlan(options.database).findOne({_id: id, tenant: currentTenant.id}),
      options,
    );

    if (!record) {
      throw new Error404();
    }

    await ProcurementManagementPlan(options.database).updateOne(
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
      ProcurementManagementPlan(options.database).findOne({_id: id, tenant: currentTenant.id}),
      options,
    );

    if (!record) {
      throw new Error404();
    }

    await ProcurementManagementPlan(options.database).deleteOne({ _id: id }, options);

    await this._createAuditLog(
      AuditLogRepository.DELETE,
      id,
      record,
      options,
    );
  }

  static async destroyManyFromProjectId(projectId: string, options: IRepositoryOptions) {
    
    await ProcurementManagementPlan(
      options.database,
    ).deleteMany({ project: projectId }, options);

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

    const records = await ProcurementManagementPlan(options.database)
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
      ProcurementManagementPlan(options.database).countDocuments({
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
      ProcurementManagementPlan(options.database)
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

      if (filter.productsServicesWillBeObtained) {
        criteriaAnd.push({
          productsServicesWillBeObtained: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.productsServicesWillBeObtained,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.howProcurementCoordinated) {
        criteriaAnd.push({
          howProcurementCoordinated: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.howProcurementCoordinated,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.timetableProcurementActivities) {
        criteriaAnd.push({
          timetableProcurementActivities: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.timetableProcurementActivities,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.procurementMetrics) {
        criteriaAnd.push({
          procurementMetrics: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.procurementMetrics,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.constraintsAssumptions) {
        criteriaAnd.push({
          constraintsAssumptions: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.constraintsAssumptions,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.stakeholderRolesResponsibilities) {
        criteriaAnd.push({
          stakeholderRolesResponsibilities: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.stakeholderRolesResponsibilities,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.theLegalJurisdiction) {
        criteriaAnd.push({
          theLegalJurisdiction: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.theLegalJurisdiction,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.independentEstimates) {
        criteriaAnd.push({
          independentEstimates: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.independentEstimates,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.riskManagementIssues) {
        criteriaAnd.push({
          riskManagementIssues: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.riskManagementIssues,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.prequalifiedSellers) {
        criteriaAnd.push({
          prequalifiedSellers: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.prequalifiedSellers,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.procurementStrategy) {
        criteriaAnd.push({
          procurementStrategy: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.procurementStrategy,
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

    let rows = await ProcurementManagementPlan(options.database)
      .find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort);

    const count = await ProcurementManagementPlan(
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
            productsServicesWillBeObtained: {
              $regex: MongooseQueryUtils.escapeRegExp(search),
              $options: 'i',
            }
          },          
        ],
      });
    }

    const sort = MongooseQueryUtils.sort('productsServicesWillBeObtained_ASC');
    const limitEscaped = Number(limit || 0) || undefined;

    const criteria = { $and: criteriaAnd };

    const records = await ProcurementManagementPlan(options.database)
      .find(criteria)
      .limit(limitEscaped)
      .sort(sort);

    return records.map((record) => ({
      id: record.id,
      label: record.productsServicesWillBeObtained,
    }));
  }

  static async _createAuditLog(action, id, data, options: IRepositoryOptions) {
    await AuditLogRepository.log(
      {
        entityName: ProcurementManagementPlan(options.database).modelName,
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

export default ProcurementManagementPlanRepository;
