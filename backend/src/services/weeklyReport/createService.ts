import MongooseRepository from '../../database/repositories/mongooseRepository';

import Error400 from '../../errors/Error400';
import { IServiceOptions } from '../IServiceOptions';

import weeklyReportMapping from '../../mapping/weeklyReport';
import { IWeeklyReport } from '../../interfaces';
import WeeklyReportRepository from '../../database/repositories/weeklyReportRepository';
import WeeklyEvaluationRepository from '../../database/repositories/weeklyEvaluationRepository';
import ProcessReportCreateService from '../processReport/createService';

export default class WeeklyReportCreateService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async create(
    data: IWeeklyReport,
    weeklyEvaluationId: string,
    language: string,
  ) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );
    console.log(data);
    let processes;

    try {
      const date = Date.now();

      const isInRange =
        await WeeklyEvaluationRepository.verifySubmitDateRange(
          date,
          weeklyEvaluationId,
          this.options,
        );
      console.log(isInRange);

      if (!isInRange) throw new Error400(language);

      if (data && data.score) {
        delete data.score;
      }

      let record = await WeeklyReportRepository.create(
        data,
        weeklyEvaluationId,
        {
          ...this.options,
          session,
        },
      );

      if (!record) throw new Error400();

      if (data.processes) {
         processes =
          await new ProcessReportCreateService(
            this.options,
          ).create(data.processes, record.id, language);
      }

      record.processes = processes;

      await MongooseRepository.commitTransaction(session);

      return record;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);
      throw error;
    }
  }
}
