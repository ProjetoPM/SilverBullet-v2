import MongooseRepository from '../../database/repositories/mongooseRepository';
import WeeklyReportRepository from '../../database/repositories/weeklyReportRepository';
import ProcessReportRepository from '../../database/repositories/processReportRepository';
import ProcessReportDeleteService from '../processReport/deleteService';
import { IServiceOptions } from '../IServiceOptions';

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

    const { id: userId } =
      await MongooseRepository.getCurrentUser(this.options);

    for (const id of data) {
      this.delete(id, userId);
    }

    try {
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

    if (!weeklyReport) throw new Error();

    if (weeklyReport.createdBy != userId) return;

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
