import MongooseRepository from './mongooseRepository';
import MongooseQueryUtils from '../utils/mongooseQueryUtils';
import AuditLogRepository from './auditLogRepository';
import Error404 from '../../errors/Error404';
import { IRepositoryOptions } from './IRepositoryOptions';
import lodash from 'lodash';
import RequirementDocumentation from '../models/requirementDocumentation';

class RequirementDocumentationRepository {
  
  static async create(data, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(
      options,
    );

    const currentUser = MongooseRepository.getCurrentUser(
      options,
    );

    const [record] = await RequirementDocumentation(
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
      RequirementDocumentation(options.database).findOne({_id: id, tenant: currentTenant.id}),
      options,
    );

    if (!record) {
      throw new Error404();
    }

    await RequirementDocumentation(options.database).updateOne(
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
      RequirementDocumentation(options.database).findOne({_id: id, tenant: currentTenant.id}),
      options,
    );

    if (!record) {
      throw new Error404();
    }

    await RequirementDocumentation(options.database).deleteOne({ _id: id }, options);

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

    const records = await RequirementDocumentation(options.database)
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
      RequirementDocumentation(options.database).countDocuments({
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
      RequirementDocumentation(options.database)
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

      if (filter.associatedID) {
        criteriaAnd.push({
          associatedID: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.associatedID,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.businessNeeds) {
        criteriaAnd.push({
          businessNeeds: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.businessNeeds,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.requirementDescription) {
        criteriaAnd.push({
          requirementDescription: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.requirementDescription,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.version) {
        criteriaAnd.push({
          version: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.version,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.phase) {
        criteriaAnd.push({
          phase: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.phase,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.associatedDelivery) {
        criteriaAnd.push({
          associatedDelivery: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.associatedDelivery,
            ),
            $options: 'i',
          },
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

      if (filter.complexityRange) {
        const [start, end] = filter.complexityRange;

        if (start !== undefined && start !== null && start !== '') {
          criteriaAnd.push({
            complexity: {
              $gte: start,
            },
          });
        }

        if (end !== undefined && end !== null && end !== '') {
          criteriaAnd.push({
            complexity: {
              $lte: end,
            },
          });
        }
      }

      if (filter.responsible) {
        criteriaAnd.push({
          responsible: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.responsible,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.validity) {
        criteriaAnd.push({
          validity: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.validity,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.priority) {
        criteriaAnd.push({
          priority: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.priority,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.acceptanceCriteria) {
        criteriaAnd.push({
          acceptanceCriteria: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.acceptanceCriteria,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.supportingDocumentation) {
        criteriaAnd.push({
          supportingDocumentation: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.supportingDocumentation,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.requirementSituation) {
        criteriaAnd.push({
          requirementSituation: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.requirementSituation,
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

    let rows = await RequirementDocumentation(options.database)
      .find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort);

    const count = await RequirementDocumentation(
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
            associatedID: {
              $regex: MongooseQueryUtils.escapeRegExp(search),
              $options: 'i',
            }
          },          
        ],
      });
    }

    const sort = MongooseQueryUtils.sort('associatedID_ASC');
    const limitEscaped = Number(limit || 0) || undefined;

    const criteria = { $and: criteriaAnd };

    const records = await RequirementDocumentation(options.database)
      .find(criteria)
      .limit(limitEscaped)
      .sort(sort);

    return records.map((record) => ({
      id: record.id,
      label: record.associatedID,
    }));
  }

  static async _createAuditLog(action, id, data, options: IRepositoryOptions) {
    await AuditLogRepository.log(
      {
        entityName: RequirementDocumentation(options.database).modelName,
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

export default RequirementDocumentationRepository;
