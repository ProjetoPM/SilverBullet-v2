import MongooseRepository from './mongooseRepository';
import MongooseQueryUtils from '../utils/mongooseQueryUtils';
import AuditLogRepository from './auditLogRepository';
import WeeklyEvaluation from '../models/weeklyEvaluation';
import Error404 from '../../errors/Error404';
import Error400 from '../../errors/Error400';
import { IRepositoryOptions } from './IRepositoryOptions';
import { IWeeklyEvaluation } from '../../interfaces';

class WeeklyEvaluationRepository {
  static async create(
    data: IWeeklyEvaluation,
    options: IRepositoryOptions,
  ) {
    console.log('data');
    console.log(data);

    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    if (!currentTenant) {
      throw new Error400();
    }
    const currentUser =
      MongooseRepository.getCurrentUser(options);
    const [record] = await WeeklyEvaluation(
      options.database,
    ).create(
      [
        {
          ...data,
          tenant: currentTenant.id,
          createdBy: currentUser.id,
          updatedBy: currentUser.id,
        },
      ],
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.CREATE,
      record.id,
      data,
      {
        ...options,
        currentTenant,
      },
    );

    return this.findById(record.id, {
      ...options,
    });
  }

  static async update(
    id,
    data,
    options: IRepositoryOptions,
  ) {
    const record = await this.findById(id, options);
    if (!record) {
      throw new Error404();
    }

    await WeeklyEvaluation(options.database).updateOne(
      { _id: id },
      {
        ...data,
        updatedBy:
          MongooseRepository.getCurrentUser(options).id,
      },
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.UPDATE,
      id,
      data,
      options,
    );

    return await this.findById(id, options);
  }

  /**
   * Updates the Tenant Plan user.
   */
  static async updatePlanUser(
    id,
    planStripeCustomerId,
    planUserId,
    options: IRepositoryOptions,
  ) {
    const currentUser =
      MongooseRepository.getCurrentUser(options);

    const data = {
      planStripeCustomerId,
      planUserId,
      updatedBy: currentUser.id,
    };

    await WeeklyEvaluation(options.database).updateOne(
      { _id: id },
      data,
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.UPDATE,
      id,
      data,
      options,
    );

    return await this.findById(id, options);
  }

  static async destroy(
    id: Object,
    options: IRepositoryOptions,
  ) {
    let record =
      await MongooseRepository.wrapWithSessionIfExists(
        WeeklyEvaluation(options.database).findById(id),
        options,
      );

    await WeeklyEvaluation(options.database).deleteOne(
      { _id: id },
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.DELETE,
      id,
      record,
      options,
    );
  }

  static async destroyAll(
    weeklyEvaluations: Array<IWeeklyEvaluation>,
    options: IRepositoryOptions,
  ) {
    for (const weeklyEvaluation of weeklyEvaluations) {
      this.destroy(weeklyEvaluation.id!, options);
    }
  }

  static async count(filter, options: IRepositoryOptions) {
    return MongooseRepository.wrapWithSessionIfExists(
      WeeklyEvaluation(options.database).countDocuments(
        filter,
      ),
      options,
    );
  }

  static async findById(id, options: IRepositoryOptions) {
    const record =
      await MongooseRepository.wrapWithSessionIfExists(
        WeeklyEvaluation(options.database).findById(id),
        options,
      );

    if (!record) {
      return record;
    }

    const output = record.toObject
      ? record.toObject()
      : record;

    return output;
  }

  static async verifySubmitDateRange(
    date: any,
    id: string,
    options,
  ) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);
    // let criteria = {
    //   _id: id,
    //   _tenant: currentTenant.tenant,
    //   startDate: {
    //     $lte: date,
    //   },
    //   endDate: {
    //     $lte: date,
    //   },
    // };
    let criteriaAnd: any = [];

    criteriaAnd.push({
      ['_id']: MongooseQueryUtils.uuid(id),
    });

    criteriaAnd.push({
      tenant: currentTenant.id,
    });

    criteriaAnd.push({
      startDate: {
        $lte: date,
      },
    });

    criteriaAnd.push({
      endDate: {
        $gte: date,
      },
    });

    const criteria = { $and: criteriaAnd };
    
    const data = await WeeklyEvaluation(
      options.database,
    ).find(criteria);

    console.log(data);

    const exists = data.length > 0 ? true : false;
    return exists;
  }

  static async findAndCountAll(
    { filter, limit = 0, offset = 0, orderBy = '' },
    options: IRepositoryOptions,
  ) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

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

    let rows = await WeeklyEvaluation(options.database)
      .find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort);

    const count = await WeeklyEvaluation(
      options.database,
    ).countDocuments(criteria);

    return { rows, count };
  }

  static async _createAuditLog(
    action,
    id,
    data,
    options: IRepositoryOptions,
  ) {
    await AuditLogRepository.log(
      {
        entityName: WeeklyEvaluation(options.database)
          .modelName,
        entityId: id,
        action,
        values: data,
      },
      options,
    );
  }
}

export default WeeklyEvaluationRepository;