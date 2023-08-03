import MongooseRepository from './mongooseRepository';
import MongooseQueryUtils from '../utils/mongooseQueryUtils';
import AuditLogRepository from './auditLogRepository';
import Error404 from '../../errors/Error404';
import { IRepositoryOptions } from './IRepositoryOptions';
import lodash from 'lodash';
import CostEstimates from '../models/costEstimates';

class CostEstimatesRepository {
  
  static async create(data, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(
      options,
    );

    const currentUser = MongooseRepository.getCurrentUser(
      options,
    );

    const [record] = await CostEstimates(
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
      CostEstimates(options.database).findOne({_id: id, tenant: currentTenant.id}),
      options,
    );

    if (!record) {
      throw new Error404();
    }

    await CostEstimates(options.database).updateOne(
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
      CostEstimates(options.database).findOne({_id: id, tenant: currentTenant.id}),
      options,
    );

    if (!record) {
      throw new Error404();
    }

    await CostEstimates(options.database).deleteOne({ _id: id }, options);

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

    const records = await CostEstimates(options.database)
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
      CostEstimates(options.database).countDocuments({
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
      CostEstimates(options.database)
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

      if (filter.estimatedCost) {
        criteriaAnd.push({
          estimatedCost: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.estimatedCost,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.cumulativeEstimatedCostRange) {
        const [start, end] = filter.cumulativeEstimatedCostRange;

        if (start !== undefined && start !== null && start !== '') {
          criteriaAnd.push({
            cumulativeEstimatedCost: {
              $gte: start,
            },
          });
        }

        if (end !== undefined && end !== null && end !== '') {
          criteriaAnd.push({
            cumulativeEstimatedCost: {
              $lte: end,
            },
          });
        }
      }

      if (filter.replantedCostRange) {
        const [start, end] = filter.replantedCostRange;

        if (start !== undefined && start !== null && start !== '') {
          criteriaAnd.push({
            replantedCost: {
              $gte: start,
            },
          });
        }

        if (end !== undefined && end !== null && end !== '') {
          criteriaAnd.push({
            replantedCost: {
              $lte: end,
            },
          });
        }
      }

      if (filter.contingencyReserveRange) {
        const [start, end] = filter.contingencyReserveRange;

        if (start !== undefined && start !== null && start !== '') {
          criteriaAnd.push({
            contingencyReserve: {
              $gte: start,
            },
          });
        }

        if (end !== undefined && end !== null && end !== '') {
          criteriaAnd.push({
            contingencyReserve: {
              $lte: end,
            },
          });
        }
      }

      if (filter.sumWorkPackagesRange) {
        const [start, end] = filter.sumWorkPackagesRange;

        if (start !== undefined && start !== null && start !== '') {
          criteriaAnd.push({
            sumWorkPackages: {
              $gte: start,
            },
          });
        }

        if (end !== undefined && end !== null && end !== '') {
          criteriaAnd.push({
            sumWorkPackages: {
              $lte: end,
            },
          });
        }
      }

      if (filter.contingencyReservePackagesRange) {
        const [start, end] = filter.contingencyReservePackagesRange;

        if (start !== undefined && start !== null && start !== '') {
          criteriaAnd.push({
            contingencyReservePackages: {
              $gte: start,
            },
          });
        }

        if (end !== undefined && end !== null && end !== '') {
          criteriaAnd.push({
            contingencyReservePackages: {
              $lte: end,
            },
          });
        }
      }

      if (filter.baseline) {
        criteriaAnd.push({
          baseline: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.baseline,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.budgetRange) {
        const [start, end] = filter.budgetRange;

        if (start !== undefined && start !== null && start !== '') {
          criteriaAnd.push({
            budget: {
              $gte: start,
            },
          });
        }

        if (end !== undefined && end !== null && end !== '') {
          criteriaAnd.push({
            budget: {
              $lte: end,
            },
          });
        }
      }

      if (filter.cumulativeReplantedCostRange) {
        const [start, end] = filter.cumulativeReplantedCostRange;

        if (start !== undefined && start !== null && start !== '') {
          criteriaAnd.push({
            cumulativeReplantedCost: {
              $gte: start,
            },
          });
        }

        if (end !== undefined && end !== null && end !== '') {
          criteriaAnd.push({
            cumulativeReplantedCost: {
              $lte: end,
            },
          });
        }
      }

      if (filter.realCostRange) {
        const [start, end] = filter.realCostRange;

        if (start !== undefined && start !== null && start !== '') {
          criteriaAnd.push({
            realCost: {
              $gte: start,
            },
          });
        }

        if (end !== undefined && end !== null && end !== '') {
          criteriaAnd.push({
            realCost: {
              $lte: end,
            },
          });
        }
      }

      if (filter.cumulativeRealCostRange) {
        const [start, end] = filter.cumulativeRealCostRange;

        if (start !== undefined && start !== null && start !== '') {
          criteriaAnd.push({
            cumulativeRealCost: {
              $gte: start,
            },
          });
        }

        if (end !== undefined && end !== null && end !== '') {
          criteriaAnd.push({
            cumulativeRealCost: {
              $lte: end,
            },
          });
        }
      }

      if (filter.managementReserveRange) {
        const [start, end] = filter.managementReserveRange;

        if (start !== undefined && start !== null && start !== '') {
          criteriaAnd.push({
            managementReserve: {
              $gte: start,
            },
          });
        }

        if (end !== undefined && end !== null && end !== '') {
          criteriaAnd.push({
            managementReserve: {
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

    let rows = await CostEstimates(options.database)
      .find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort);

    const count = await CostEstimates(
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
          
        ],
      });
    }

    const sort = MongooseQueryUtils.sort('id_ASC');
    const limitEscaped = Number(limit || 0) || undefined;

    const criteria = { $and: criteriaAnd };

    const records = await CostEstimates(options.database)
      .find(criteria)
      .limit(limitEscaped)
      .sort(sort);

    return records.map((record) => ({
      id: record.id,
      label: record.id,
    }));
  }

  static async _createAuditLog(action, id, data, options: IRepositoryOptions) {
    await AuditLogRepository.log(
      {
        entityName: CostEstimates(options.database).modelName,
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

export default CostEstimatesRepository;
