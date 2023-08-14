import MongooseRepository from '../../database/repositories/mongooseRepository';

import Error400 from '../../errors/Error400';
import { IServiceOptions } from '../IServiceOptions';

import WeeklyEvaluationRepository from '../../database/repositories/weeklyEvaluationRepository';
import WeeklyReportRepository from '../../database/repositories/weeklyReportRepository';
import ProcessReportCreateService from '../processReport/createService';

export type Process = {
  group: string;
  name: string;
  description: string;
  files?: File[];
};

export type RequestWeeklyReport = {
  weeklyEvaluationId: string;
  toolEvaluation: string;
  processes?: Process[];
};

export default class WeeklyReportCreateService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async create(
    data: RequestWeeklyReport,
    language: string,
    tenantId: string,
  ) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    console.log('data');
    console.log(data);
    
    try {
      const date = Date.now();

      if (!data.weeklyEvaluationId) throw new Error400();

      const isInRange =
        await WeeklyEvaluationRepository.verifySubmitDateRange(
          date,
          data.weeklyEvaluationId,
          this.options,
        );

      if (!isInRange)
        throw new Error400(
          language,
          'tenant.weeklyReport.errors.rangeDateError',
        );

      let record = await WeeklyReportRepository.create(
        data,
        {
          ...this.options,
          session,
        },
      );

      if (!record) throw new Error400();

      if (data.processes) {
        record.processes =
          await new ProcessReportCreateService(
            this.options,
          ).create(
            { processes: data.processes },
            record.id,
            language,
            tenantId,
          );
      }

      await MongooseRepository.commitTransaction(session);
      return record;
    } catch (error: any) {
      throw error;
    } finally {
      await MongooseRepository.abortTransaction(session);
    }
  }
}
