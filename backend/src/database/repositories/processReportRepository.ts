import Error400 from '../../errors/Error400';
import Error404 from '../../errors/Error404';
import { IProcessReport } from '../../interfaces';
import { Process } from '../../services/weeklyReport/createService';
import { ProcessToDelete, UpdateProcess } from '../../services/weeklyReport/updateService';
import ProcessReport from '../models/processReport';
import { IRepositoryOptions } from './IRepositoryOptions';
import AuditLogRepository from './auditLogRepository';
import MongooseRepository from './mongooseRepository';

class ProcessReportRepository {
  static async create(
    process: Process,
    weeklyReportId: string,
    options: IRepositoryOptions,
  ) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    if (!currentTenant) {
      throw new Error400();
    }

    const currentUser =
      MongooseRepository.getCurrentUser(options);

    const [record] = await ProcessReport(
      options.database,
    ).create(
      [
        {
          ...process,
          weeklyReport: weeklyReportId,
          createdBy: currentUser.id,
          updatedBy: currentUser.id,
        },
      ],
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.CREATE,
      record.id,
      process,
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
    id: string,
    data: UpdateProcess,
    options: IRepositoryOptions,
  ) {
    const record: IProcessReport = await this.findById(
      id,
      options,
    );
    if (!record) {
      throw new Error404();
    }

    await ProcessReport(options.database).updateOne(
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

  static async findById(
    id,
    options: IRepositoryOptions,
  ): Promise<IProcessReport> {
    const record =
      await MongooseRepository.wrapWithSessionIfExists(
        ProcessReport(options.database).findById(id),
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

  static async destroy(
    id: string,
    options: IRepositoryOptions,
  ) {
    let record =
      await MongooseRepository.wrapWithSessionIfExists(
        ProcessReport(options.database).findById(id),
        options,
      );

    await ProcessReport(options.database).deleteOne(
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

  static async getProcessesByWeeklyReportId(
    id: Object,
    options,
  ) {
    const criteriaAnd: any = [
      {
        weeklyReport: id,
      },
    ];
    const criteria = { $and: criteriaAnd };

    const rows = await ProcessReport(options.database).find(
      criteria,
    );

    const count = await ProcessReport(
      options.database,
    ).countDocuments(criteria);

    return { rows, count };
  }

  static async destroyAll(
    processes: Array<string>,
    options: IRepositoryOptions,
  ) {
    for (const id of processes) {
      this.destroy(id, options);
    }
  }

  static async count(filter, options: IRepositoryOptions) {
    return MongooseRepository.wrapWithSessionIfExists(
      ProcessReport(options.database).countDocuments(
        filter,
      ),
      options,
    );
  }

  static async _createAuditLog(
    action,
    id,
    data,
    options: IRepositoryOptions,
  ) {
    await AuditLogRepository.log(
      {
        entityName: ProcessReport(options.database)
          .modelName,
        entityId: id,
        action,
        values: data,
      },
      options,
    );
  }
}

export default ProcessReportRepository;
