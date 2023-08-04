import MongooseRepository from './mongooseRepository';
import MongooseQueryUtils from '../utils/mongooseQueryUtils';
import AuditLogRepository from './auditLogRepository';
import Error404 from '../../errors/Error404';
import { IRepositoryOptions } from './IRepositoryOptions';
import lodash from 'lodash';
import RequirementsManagementPlan from '../models/requirementsManagementPlan';

class RequirementsManagementPlanRepository {
  
  static async create(data, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(
      options,
    );

    const currentUser = MongooseRepository.getCurrentUser(
      options,
    );

    const currentProject = MongooseRepository.getCurrentProject(
      options,
    );

    const [record] = await RequirementsManagementPlan(
      options.database,
    ).create(
      [
        {
          ...data,
          tenant: currentTenant.id,
          project: currentProject.id,
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

    const currentProject = MongooseRepository.getCurrentProject(options);


    let record = await MongooseRepository.wrapWithSessionIfExists(
      RequirementsManagementPlan(options.database).findOne({_id: id, tenant: currentTenant.id, project: currentProject.id}),
      options,
    );

    if (!record) {
      throw new Error404();
    }

    await RequirementsManagementPlan(options.database).updateOne(
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

    const currentProject = MongooseRepository.getCurrentProject(options);


    let record = await MongooseRepository.wrapWithSessionIfExists(
      RequirementsManagementPlan(options.database).findOne({_id: id, tenant: currentTenant.id, project: currentProject.id}),
      options,
    );

    if (!record) {
      throw new Error404();
    }

    await RequirementsManagementPlan(options.database).deleteOne({ _id: id }, options);

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

      const currentProject = MongooseRepository.getCurrentProject(options);


    const records = await RequirementsManagementPlan(options.database)
      .find({
        _id: { $in: ids },
        tenant: currentTenant.id,
        project: currentProject.id
      })
      .select(['_id']);

    return records.map((record) => record._id);
  }

  static async count(filter, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(
      options,
    );

    const currentProject = MongooseRepository.getCurrentProject(options);


    return MongooseRepository.wrapWithSessionIfExists(
      RequirementsManagementPlan(options.database).countDocuments({
        ...filter,
        tenant: currentTenant.id,
        project: currentProject.id
      }),
      options,
    );
  }

  static async findById(id, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(
      options,
    );

    const currentProject = MongooseRepository.getCurrentProject(options);

    let record = await MongooseRepository.wrapWithSessionIfExists(
      RequirementsManagementPlan(options.database)
        .findOne({_id: id, tenant: currentTenant.id, project: currentProject.id}),
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

    const currentProject = MongooseRepository.getCurrentProject(options);

    let criteriaAnd: any = [];
    
    criteriaAnd.push({
      tenant: currentTenant.id,
    });

    criteriaAnd.push({
      project: currentProject.id
    });

    if (filter) {
      if (filter.id) {
        criteriaAnd.push({
          ['_id']: MongooseQueryUtils.uuid(filter.id),
        });
      }

      if (filter.requirementsActivities) {
        criteriaAnd.push({
          requirementsActivities: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.requirementsActivities,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.configurationManagementActivities) {
        criteriaAnd.push({
          configurationManagementActivities: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.configurationManagementActivities,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.requirementsPrioritizationProcess) {
        criteriaAnd.push({
          requirementsPrioritizationProcess: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.requirementsPrioritizationProcess,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.metricsRationale) {
        criteriaAnd.push({
          metricsRationale: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.metricsRationale,
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

    let rows = await RequirementsManagementPlan(options.database)
      .find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort);

    const count = await RequirementsManagementPlan(
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

    const currentProject = MongooseRepository.getCurrentProject(options);

    let criteriaAnd: Array<any> = [{
      tenant: currentTenant.id,
      project: currentProject.id
    }];

    if (search) {
      criteriaAnd.push({
        $or: [
          {
            _id: MongooseQueryUtils.uuid(search),
          },
          {
            requirementsActivities: {
              $regex: MongooseQueryUtils.escapeRegExp(search),
              $options: 'i',
            }
          },          
        ],
      });
    }

    const sort = MongooseQueryUtils.sort('requirementsActivities_ASC');
    const limitEscaped = Number(limit || 0) || undefined;

    const criteria = { $and: criteriaAnd };

    const records = await RequirementsManagementPlan(options.database)
      .find(criteria)
      .limit(limitEscaped)
      .sort(sort);

    return records.map((record) => ({
      id: record.id,
      label: record.requirementsActivities,
    }));
  }

  static async _createAuditLog(action, id, data, options: IRepositoryOptions) {
    await AuditLogRepository.log(
      {
        entityName: RequirementsManagementPlan(options.database).modelName,
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

export default RequirementsManagementPlanRepository;
