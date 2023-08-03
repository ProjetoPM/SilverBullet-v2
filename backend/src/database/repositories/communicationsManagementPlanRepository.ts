import MongooseRepository from './mongooseRepository';
import MongooseQueryUtils from '../utils/mongooseQueryUtils';
import AuditLogRepository from './auditLogRepository';
import Error404 from '../../errors/Error404';
import { IRepositoryOptions } from './IRepositoryOptions';
import lodash from 'lodash';
import CommunicationsManagementPlan from '../models/communicationsManagementPlan';

class CommunicationsManagementPlanRepository {
  
  static async create(data, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(
      options,
    );

    const currentUser = MongooseRepository.getCurrentUser(
      options,
    );

    const [record] = await CommunicationsManagementPlan(
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
      CommunicationsManagementPlan(options.database).findOne({_id: id, tenant: currentTenant.id}),
      options,
    );

    if (!record) {
      throw new Error404();
    }

    await CommunicationsManagementPlan(options.database).updateOne(
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
      CommunicationsManagementPlan(options.database).findOne({_id: id, tenant: currentTenant.id}),
      options,
    );

    if (!record) {
      throw new Error404();
    }

    await CommunicationsManagementPlan(options.database).deleteOne({ _id: id }, options);

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

    const records = await CommunicationsManagementPlan(options.database)
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
      CommunicationsManagementPlan(options.database).countDocuments({
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
      CommunicationsManagementPlan(options.database)
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

      if (filter.type) {
        criteriaAnd.push({
          type: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.type,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.nome) {
        criteriaAnd.push({
          nome: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.nome,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.content) {
        criteriaAnd.push({
          content: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.content,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.distributionReason) {
        criteriaAnd.push({
          distributionReason: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.distributionReason,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.language) {
        criteriaAnd.push({
          language: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.language,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.channel) {
        criteriaAnd.push({
          channel: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.channel,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.documentFormat) {
        criteriaAnd.push({
          documentFormat: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.documentFormat,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.method) {
        criteriaAnd.push({
          method: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.method,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.frequency) {
        criteriaAnd.push({
          frequency: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.frequency,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.allocatedResources) {
        criteriaAnd.push({
          allocatedResources: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.allocatedResources,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.format) {
        criteriaAnd.push({
          format: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.format,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.local) {
        criteriaAnd.push({
          local: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.local,
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

    let rows = await CommunicationsManagementPlan(options.database)
      .find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort);

    const count = await CommunicationsManagementPlan(
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
            nome: {
              $regex: MongooseQueryUtils.escapeRegExp(search),
              $options: 'i',
            }
          },          
        ],
      });
    }

    const sort = MongooseQueryUtils.sort('nome_ASC');
    const limitEscaped = Number(limit || 0) || undefined;

    const criteria = { $and: criteriaAnd };

    const records = await CommunicationsManagementPlan(options.database)
      .find(criteria)
      .limit(limitEscaped)
      .sort(sort);

    return records.map((record) => ({
      id: record.id,
      label: record.nome,
    }));
  }

  static async _createAuditLog(action, id, data, options: IRepositoryOptions) {
    await AuditLogRepository.log(
      {
        entityName: CommunicationsManagementPlan(options.database).modelName,
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

export default CommunicationsManagementPlanRepository;
