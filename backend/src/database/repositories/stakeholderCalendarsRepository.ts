import MongooseRepository from './mongooseRepository';
import MongooseQueryUtils from '../utils/mongooseQueryUtils';
import AuditLogRepository from './auditLogRepository';
import Error404 from '../../errors/Error404';
import { IRepositoryOptions } from './IRepositoryOptions';
import lodash from 'lodash';
import StakeholderCalendars from '../models/stakeholderCalendars';

class StakeholderCalendarsRepository {
  
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

    const [record] = await StakeholderCalendars(
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
      StakeholderCalendars(options.database).findOne({_id: id, tenant: currentTenant.id, project: currentProject.id}),
      options,
    );

    if (!record) {
      throw new Error404();
    }

    await StakeholderCalendars(options.database).updateOne(
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
      StakeholderCalendars(options.database).findOne({_id: id, tenant: currentTenant.id, project: currentProject.id}),
      options,
    );

    if (!record) {
      throw new Error404();
    }

    await StakeholderCalendars(options.database).deleteOne({ _id: id }, options);

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


    const records = await StakeholderCalendars(options.database)
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
      StakeholderCalendars(options.database).countDocuments({
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
      StakeholderCalendars(options.database)
        .findOne({_id: id, tenant: currentTenant.id, project: currentProject.id})
      .populate('activity')
      .populate('stakeholder'),
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
      project: currentProject.id
    });

    if (filter) {
      if (filter.id) {
        criteriaAnd.push({
          ['_id']: MongooseQueryUtils.uuid(filter.id),
        });
      }

      if (filter.activity) {
        criteriaAnd.push({
          activity: MongooseQueryUtils.uuid(
            filter.activity,
          ),
        });
      }

      if (filter.stakeholder) {
        criteriaAnd.push({
          stakeholder: MongooseQueryUtils.uuid(
            filter.stakeholder,
          ),
        });
      }

      if (filter.allocationStartRange) {
        const [start, end] = filter.allocationStartRange;

        if (start !== undefined && start !== null && start !== '') {
          criteriaAnd.push({
            allocationStart: {
              $gte: start,
            },
          });
        }

        if (end !== undefined && end !== null && end !== '') {
          criteriaAnd.push({
            allocationStart: {
              $lte: end,
            },
          });
        }
      }

      if (filter.allocationEndsRange) {
        const [start, end] = filter.allocationEndsRange;

        if (start !== undefined && start !== null && start !== '') {
          criteriaAnd.push({
            allocationEnds: {
              $gte: start,
            },
          });
        }

        if (end !== undefined && end !== null && end !== '') {
          criteriaAnd.push({
            allocationEnds: {
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

    let rows = await StakeholderCalendars(options.database)
      .find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort)
      .populate('activity')
      .populate('stakeholder');

    const count = await StakeholderCalendars(
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
          
        ],
      });
    }

    const sort = MongooseQueryUtils.sort('id_ASC');
    const limitEscaped = Number(limit || 0) || undefined;

    const criteria = { $and: criteriaAnd };

    const records = await StakeholderCalendars(options.database)
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
        entityName: StakeholderCalendars(options.database).modelName,
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

export default StakeholderCalendarsRepository;
