import MongooseRepository from './mongooseRepository';
import MongooseQueryUtils from '../utils/mongooseQueryUtils';
import AuditLogRepository from './auditLogRepository';
import Error404 from '../../errors/Error404';
import { IRepositoryOptions } from './IRepositoryOptions';
import lodash from 'lodash';
import ProjectCharter from '../models/projectCharter';

class ProjectCharterRepository {
  
  static async create(data, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(
      options,
    );

    const currentUser = MongooseRepository.getCurrentUser(
      options,
    );

    const [record] = await ProjectCharter(
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
      ProjectCharter(options.database).findOne({_id: id, tenant: currentTenant.id}),
      options,
    );

    if (!record) {
      throw new Error404();
    }

    await ProjectCharter(options.database).updateOne(
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
      ProjectCharter(options.database).findOne({_id: id, tenant: currentTenant.id}),
      options,
    );

    if (!record) {
      throw new Error404();
    }

    await ProjectCharter(options.database).deleteOne({ _id: id }, options);

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

    const records = await ProjectCharter(options.database)
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
      ProjectCharter(options.database).countDocuments({
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
      ProjectCharter(options.database)
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

      if (filter.projectName) {
        criteriaAnd.push({
          projectName: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.projectName,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.highLevelProjectDescription) {
        criteriaAnd.push({
          highLevelProjectDescription: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.highLevelProjectDescription,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.startdateRange) {
        const [start, end] = filter.startdateRange;

        if (start !== undefined && start !== null && start !== '') {
          criteriaAnd.push({
            startdate: {
              $gte: start,
            },
          });
        }

        if (end !== undefined && end !== null && end !== '') {
          criteriaAnd.push({
            startdate: {
              $lte: end,
            },
          });
        }
      }

      if (filter.enddateRange) {
        const [start, end] = filter.enddateRange;

        if (start !== undefined && start !== null && start !== '') {
          criteriaAnd.push({
            enddate: {
              $gte: start,
            },
          });
        }

        if (end !== undefined && end !== null && end !== '') {
          criteriaAnd.push({
            enddate: {
              $lte: end,
            },
          });
        }
      }

      if (filter.projectPurpose) {
        criteriaAnd.push({
          projectPurpose: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.projectPurpose,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.measurableProjectObjectives) {
        criteriaAnd.push({
          measurableProjectObjectives: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.measurableProjectObjectives,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.keyBenefits) {
        criteriaAnd.push({
          keyBenefits: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.keyBenefits,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.highlevelRequirements) {
        criteriaAnd.push({
          highlevelRequirements: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.highlevelRequirements,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.boundaries) {
        criteriaAnd.push({
          boundaries: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.boundaries,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.overallProjectRisk) {
        criteriaAnd.push({
          overallProjectRisk: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.overallProjectRisk,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.summaryMilestoneSchedule) {
        criteriaAnd.push({
          summaryMilestoneSchedule: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.summaryMilestoneSchedule,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.preapprovedFinancialResources) {
        criteriaAnd.push({
          preapprovedFinancialResources: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.preapprovedFinancialResources,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.projectApprovalRequirements) {
        criteriaAnd.push({
          projectApprovalRequirements: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.projectApprovalRequirements,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.successCriteria) {
        criteriaAnd.push({
          successCriteria: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.successCriteria,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.projectExitCriteria) {
        criteriaAnd.push({
          projectExitCriteria: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.projectExitCriteria,
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

    let rows = await ProjectCharter(options.database)
      .find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort);

    const count = await ProjectCharter(
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
            projectName: {
              $regex: MongooseQueryUtils.escapeRegExp(search),
              $options: 'i',
            }
          },          
        ],
      });
    }

    const sort = MongooseQueryUtils.sort('projectName_ASC');
    const limitEscaped = Number(limit || 0) || undefined;

    const criteria = { $and: criteriaAnd };

    const records = await ProjectCharter(options.database)
      .find(criteria)
      .limit(limitEscaped)
      .sort(sort);

    return records.map((record) => ({
      id: record.id,
      label: record.projectName,
    }));
  }

  static async _createAuditLog(action, id, data, options: IRepositoryOptions) {
    await AuditLogRepository.log(
      {
        entityName: ProjectCharter(options.database).modelName,
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

export default ProjectCharterRepository;
