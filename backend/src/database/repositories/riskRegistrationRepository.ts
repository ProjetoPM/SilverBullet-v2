import MongooseRepository from './mongooseRepository';
import MongooseQueryUtils from '../utils/mongooseQueryUtils';
import AuditLogRepository from './auditLogRepository';
import Error404 from '../../errors/Error404';
import { IRepositoryOptions } from './IRepositoryOptions';
import lodash from 'lodash';
import RiskRegistration from '../models/riskRegistration';

class RiskRegistrationRepository {
  
  static async create(data, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(
      options,
    );

    const currentUser = MongooseRepository.getCurrentUser(
      options,
    );

    const [record] = await RiskRegistration(
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
      RiskRegistration(options.database).findOne({_id: id, tenant: currentTenant.id}),
      options,
    );

    if (!record) {
      throw new Error404();
    }

    await RiskRegistration(options.database).updateOne(
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
      RiskRegistration(options.database).findOne({_id: id, tenant: currentTenant.id}),
      options,
    );

    if (!record) {
      throw new Error404();
    }

    await RiskRegistration(options.database).deleteOne({ _id: id }, options);

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

    const records = await RiskRegistration(options.database)
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
      RiskRegistration(options.database).countDocuments({
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
      RiskRegistration(options.database)
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

      if (filter.impactedObjective) {
        criteriaAnd.push({
          impactedObjective: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.impactedObjective,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.priority) {
        criteriaAnd.push({
          priority: filter.priority
        });
      }

      if (filter.currentRiskStatus) {
        criteriaAnd.push({
          currentRiskStatus: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.currentRiskStatus,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.event) {
        criteriaAnd.push({
          event: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.event,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.identificationDateRange) {
        const [start, end] = filter.identificationDateRange;

        if (start !== undefined && start !== null && start !== '') {
          criteriaAnd.push({
            identificationDate: {
              $gte: start,
            },
          });
        }

        if (end !== undefined && end !== null && end !== '') {
          criteriaAnd.push({
            identificationDate: {
              $lte: end,
            },
          });
        }
      }

      if (filter.identifier) {
        criteriaAnd.push({
          identifier: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.identifier,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.riskType) {
        criteriaAnd.push({
          riskType: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.riskType,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.lessonsLearned) {
        criteriaAnd.push({
          lessonsLearned: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.lessonsLearned,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.riskCategory) {
        criteriaAnd.push({
          riskCategory: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.riskCategory,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.fallbackPlans) {
        criteriaAnd.push({
          fallbackPlans: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.fallbackPlans,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.contingencyPlansOwners) {
        criteriaAnd.push({
          contingencyPlansOwners: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.contingencyPlansOwners,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.contingencyPlans) {
        criteriaAnd.push({
          contingencyPlans: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.contingencyPlans,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.secondaryRisks) {
        criteriaAnd.push({
          secondaryRisks: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.secondaryRisks,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.residualRisks) {
        criteriaAnd.push({
          residualRisks: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.residualRisks,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.timingInformation) {
        criteriaAnd.push({
          timingInformation: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.timingInformation,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.potentialRiskOwners) {
        criteriaAnd.push({
          potentialRiskOwners: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.potentialRiskOwners,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.listPotentialRiskResponses) {
        criteriaAnd.push({
          listPotentialRiskResponses: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.listPotentialRiskResponses,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.riskTriggers) {
        criteriaAnd.push({
          riskTriggers: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.riskTriggers,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.oneOrMoreCauses) {
        criteriaAnd.push({
          oneOrMoreCauses: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.oneOrMoreCauses,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.riskStrategy) {
        criteriaAnd.push({
          riskStrategy: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.riskStrategy,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.oneMoreEffectsObjectives) {
        criteriaAnd.push({
          oneMoreEffectsObjectives: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.oneMoreEffectsObjectives,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.riskScore) {
        criteriaAnd.push({
          riskScore: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.riskScore,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.impact) {
        criteriaAnd.push({
          impact: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.impact,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.probability) {
        criteriaAnd.push({
          probability: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.probability,
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

    let rows = await RiskRegistration(options.database)
      .find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort);

    const count = await RiskRegistration(
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
            impactedObjective: {
              $regex: MongooseQueryUtils.escapeRegExp(search),
              $options: 'i',
            }
          },          
        ],
      });
    }

    const sort = MongooseQueryUtils.sort('impactedObjective_ASC');
    const limitEscaped = Number(limit || 0) || undefined;

    const criteria = { $and: criteriaAnd };

    const records = await RiskRegistration(options.database)
      .find(criteria)
      .limit(limitEscaped)
      .sort(sort);

    return records.map((record) => ({
      id: record.id,
      label: record.impactedObjective,
    }));
  }

  static async _createAuditLog(action, id, data, options: IRepositoryOptions) {
    await AuditLogRepository.log(
      {
        entityName: RiskRegistration(options.database).modelName,
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

export default RiskRegistrationRepository;
