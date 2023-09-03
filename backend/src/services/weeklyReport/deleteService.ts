import MongooseRepository from '../../database/repositories/mongooseRepository';
import WeeklyReportRepository from '../../database/repositories/weeklyReportRepository';
import ProcessReportRepository from '../../database/repositories/processReportRepository';
import ProcessReportDeleteService from '../processReport/deleteService';
import { IServiceOptions } from '../IServiceOptions';
import Error400 from '../../errors/Error400';
import { i18n } from '../../i18n';

export type IProcessToDelete = {
  id: string;
  filesFolder: string;
};

export default class WeeklyReportDeleteService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async handle(data: string[]) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      const deleteResponse: string[] = [];

      const { id: userId } =
        await MongooseRepository.getCurrentUser(
          this.options,
        );

      for (const id of data) {
        deleteResponse.push(await this.delete(id, userId));
      }
      const isDeletionWithSuccess = deleteResponse.some(
        (response) => response == 'success',
      );
      if (!isDeletionWithSuccess)
        throw new Error400(
          this.options.language,
          'tenant.weeklyReport.errors.allUnsuccessfullyDeleted',
        );

      const isDeletionWithErrors = deleteResponse.some(
        (response) => response == 'error',
      );
      if (isDeletionWithErrors) {
        const message = i18n(
          this.options.language,
          'tenant.weeklyReport.errors.someUnsuccessfullyDeleted',
        );
        return {
          type: 'warn',
          message
        };
      }

      const message = i18n(
        this.options.language,
        'tenant.weeklyReport.successResponses.deleteReportSuccessfully',
      );
      return {
        type: "success",
        message
      };
    } catch (error: any) {
      throw error;
    } finally {
      await MongooseRepository.abortTransaction(session);
    }
  }

  async delete(id: string, userId: string) {
    let processesToDelete: IProcessToDelete[] = [];

    const weeklyReport =
      await WeeklyReportRepository.findById(
        id,
        this.options,
      );

    if (!weeklyReport) return 'error';

    if (weeklyReport.createdBy != userId) return 'error';

    WeeklyReportRepository.destroy(id, this.options);

    const { rows: processes } =
      await ProcessReportRepository.getProcessesByWeeklyReportId(
        id,
        this.options,
      );

    processes.map((process) =>
      processesToDelete.push({
        id: process.id,
        filesFolder: process.filesFolder,
      }),
    );

    await new ProcessReportDeleteService(
      this.options,
    ).handle(processesToDelete);

    return 'success';
  }

  async handleDeleteFromWeeklyEvaluation(data: string[]) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    for (const id of data) {
      await this.deleteFromWeeklyEvaluation(id);
    }

    try {
    } catch (error: any) {
      throw error;
    } finally {
      await MongooseRepository.abortTransaction(session);
    }
  }

  async deleteFromWeeklyEvaluation(id: string) {
    let processesToDelete: IProcessToDelete[] = [];

    const weeklyReport =
      await WeeklyReportRepository.findById(
        id,
        this.options,
      );

    if (!weeklyReport) return;

    WeeklyReportRepository.destroy(id, this.options);

    const { rows: processes } =
      await ProcessReportRepository.getProcessesByWeeklyReportId(
        id,
        this.options,
      );

    processes.map((process) =>
      processesToDelete.push({
        id: process.id,
        filesFolder: process.filesFolder,
      }),
    );

    await new ProcessReportDeleteService(
      this.options,
    ).handle(processesToDelete);
  }
}
