import MongooseRepository from './mongooseRepository';
import MongooseQueryUtils from '../utils/mongooseQueryUtils';
import AuditLogRepository from './auditLogRepository';
import Error404 from '../../errors/Error404';
import { IRepositoryOptions } from './IRepositoryOptions';
import lodash from 'lodash';
import ProjectManagementPlan from '../models/projectManagementPlan';

class ProjectManagementPlanRepository {
  
  static async create(data, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(
      options,
    );

    const currentUser = MongooseRepository.getCurrentUser(
      options,
    );

    const [record] = await ProjectManagementPlan(
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
      ProjectManagementPlan(options.database).findOne({_id: id, tenant: currentTenant.id}),
      options,
    );

    if (!record) {
      throw new Error404();
    }

    await ProjectManagementPlan(options.database).updateOne(
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
      ProjectManagementPlan(options.database).findOne({_id: id, tenant: currentTenant.id}),
      options,
    );

    if (!record) {
      throw new Error404();
    }

    await ProjectManagementPlan(options.database).deleteOne({ _id: id }, options);

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

    const records = await ProjectManagementPlan(options.database)
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
      ProjectManagementPlan(options.database).countDocuments({
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
      ProjectManagementPlan(options.database)
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

      if (filter.scopeManagementPlan) {
        criteriaAnd.push({
          scopeManagementPlan: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.scopeManagementPlan,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.requirementsManagementPlan) {
        criteriaAnd.push({
          requirementsManagementPlan: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.requirementsManagementPlan,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.scheduleManagementPlan) {
        criteriaAnd.push({
          scheduleManagementPlan: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.scheduleManagementPlan,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.costManagementPlan) {
        criteriaAnd.push({
          costManagementPlan: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.costManagementPlan,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.qualityManagementPlan) {
        criteriaAnd.push({
          qualityManagementPlan: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.qualityManagementPlan,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.resourceManagementPlan) {
        criteriaAnd.push({
          resourceManagementPlan: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.resourceManagementPlan,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.communicationsManagementPlan) {
        criteriaAnd.push({
          communicationsManagementPlan: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.communicationsManagementPlan,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.riskManagementPlan) {
        criteriaAnd.push({
          riskManagementPlan: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.riskManagementPlan,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.procurementManagementPlan) {
        criteriaAnd.push({
          procurementManagementPlan: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.procurementManagementPlan,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.stakeholderEngagementPlan) {
        criteriaAnd.push({
          stakeholderEngagementPlan: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.stakeholderEngagementPlan,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.scopeBaseline) {
        criteriaAnd.push({
          scopeBaseline: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.scopeBaseline,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.scheduleBaseline) {
        criteriaAnd.push({
          scheduleBaseline: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.scheduleBaseline,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.costBaseline) {
        criteriaAnd.push({
          costBaseline: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.costBaseline,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.changeManagementPlan) {
        criteriaAnd.push({
          changeManagementPlan: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.changeManagementPlan,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.configurationManagementPlan) {
        criteriaAnd.push({
          configurationManagementPlan: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.configurationManagementPlan,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.performanceMeasurementBaseline) {
        criteriaAnd.push({
          performanceMeasurementBaseline: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.performanceMeasurementBaseline,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.projectLifeCycle) {
        criteriaAnd.push({
          projectLifeCycle: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.projectLifeCycle,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.developmentApproach) {
        criteriaAnd.push({
          developmentApproach: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.developmentApproach,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.managementReviews) {
        criteriaAnd.push({
          managementReviews: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.managementReviews,
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

    let rows = await ProjectManagementPlan(options.database)
      .find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort);

    const count = await ProjectManagementPlan(
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
            scopeManagementPlan: {
              $regex: MongooseQueryUtils.escapeRegExp(search),
              $options: 'i',
            }
          },          
        ],
      });
    }

    const sort = MongooseQueryUtils.sort('scopeManagementPlan_ASC');
    const limitEscaped = Number(limit || 0) || undefined;

    const criteria = { $and: criteriaAnd };

    const records = await ProjectManagementPlan(options.database)
      .find(criteria)
      .limit(limitEscaped)
      .sort(sort);

    return records.map((record) => ({
      id: record.id,
      label: record.scopeManagementPlan,
    }));
  }

  static async _createAuditLog(action, id, data, options: IRepositoryOptions) {
    await AuditLogRepository.log(
      {
        entityName: ProjectManagementPlan(options.database).modelName,
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

export default ProjectManagementPlanRepository;
