import MongooseRepository from './mongooseRepository';
import MongooseQueryUtils from '../utils/mongooseQueryUtils';
import AuditLogRepository from './auditLogRepository';
import Error404 from '../../errors/Error404';
import { IRepositoryOptions } from './IRepositoryOptions';
import lodash from 'lodash';
import ChangeRequest from '../models/changeRequest';

class ChangeRequestRepository {
  
  static async create(data, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(
      options,
    );

    const currentUser = MongooseRepository.getCurrentUser(
      options,
    );

    const [record] = await ChangeRequest(
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
      ChangeRequest(options.database).findOne({_id: id, tenant: currentTenant.id}),
      options,
    );

    if (!record) {
      throw new Error404();
    }

    await ChangeRequest(options.database).updateOne(
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
      ChangeRequest(options.database).findOne({_id: id, tenant: currentTenant.id}),
      options,
    );

    if (!record) {
      throw new Error404();
    }

    await ChangeRequest(options.database).deleteOne({ _id: id }, options);

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

    const records = await ChangeRequest(options.database)
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
      ChangeRequest(options.database).countDocuments({
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
      ChangeRequest(options.database)
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

      if (filter.requester) {
        criteriaAnd.push({
          requester: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.requester,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.requestIdentificationNumber) {
        criteriaAnd.push({
          requestIdentificationNumber: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.requestIdentificationNumber,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.typeChange) {
        criteriaAnd.push({
          typeChange: filter.typeChange
        });
      }

      if (filter.statusSituation) {
        criteriaAnd.push({
          statusSituation: filter.statusSituation
        });
      }

      if (filter.requestDateRange) {
        const [start, end] = filter.requestDateRange;

        if (start !== undefined && start !== null && start !== '') {
          criteriaAnd.push({
            requestDate: {
              $gte: start,
            },
          });
        }

        if (end !== undefined && end !== null && end !== '') {
          criteriaAnd.push({
            requestDate: {
              $lte: end,
            },
          });
        }
      }

      if (filter.dateCCBRange) {
        const [start, end] = filter.dateCCBRange;

        if (start !== undefined && start !== null && start !== '') {
          criteriaAnd.push({
            dateCCB: {
              $gte: start,
            },
          });
        }

        if (end !== undefined && end !== null && end !== '') {
          criteriaAnd.push({
            dateCCB: {
              $lte: end,
            },
          });
        }
      }

      if (filter.descriptionChange) {
        criteriaAnd.push({
          descriptionChange: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.descriptionChange,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.impactedKnowledgeAreas) {
        criteriaAnd.push({
          impactedKnowledgeAreas: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.impactedKnowledgeAreas,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.impactedDeliveriesDocuments) {
        criteriaAnd.push({
          impactedDeliveriesDocuments: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.impactedDeliveriesDocuments,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.justification) {
        criteriaAnd.push({
          justification: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.justification,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.additionalComments) {
        criteriaAnd.push({
          additionalComments: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.additionalComments,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.opinionCCB) {
        criteriaAnd.push({
          opinionCCB: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.opinionCCB,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.opinionProjectManager) {
        criteriaAnd.push({
          opinionProjectManager: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.opinionProjectManager,
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

    let rows = await ChangeRequest(options.database)
      .find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort);

    const count = await ChangeRequest(
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
            requester: {
              $regex: MongooseQueryUtils.escapeRegExp(search),
              $options: 'i',
            }
          },          
        ],
      });
    }

    const sort = MongooseQueryUtils.sort('requester_ASC');
    const limitEscaped = Number(limit || 0) || undefined;

    const criteria = { $and: criteriaAnd };

    const records = await ChangeRequest(options.database)
      .find(criteria)
      .limit(limitEscaped)
      .sort(sort);

    return records.map((record) => ({
      id: record.id,
      label: record.requester,
    }));
  }

  static async _createAuditLog(action, id, data, options: IRepositoryOptions) {
    await AuditLogRepository.log(
      {
        entityName: ChangeRequest(options.database).modelName,
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

export default ChangeRequestRepository;
