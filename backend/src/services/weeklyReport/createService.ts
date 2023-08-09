import MongooseRepository from '../../database/repositories/mongooseRepository';

import Error400 from '../../errors/Error400';
import { IServiceOptions } from '../IServiceOptions';

import {groups} from '../../mapping/weeklyReport';
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
    language: string,
  ) {


    const session = await MongooseRepository.createSession(
      this.options.database,
    );
    console.log(data);
    let processes;

    try {
      const date = Date.now();
      if(!data.weeklyEvaluation) throw new Error400();

      const isInRange =
        await WeeklyEvaluationRepository.verifySubmitDateRange(
          date,
          data.weeklyEvaluation,
          this.options,
        );
      console.log('isInRange');
      console.log(isInRange);


      if (!isInRange) throw new Error400(language, 'tenant.weeklyReport.errors.rangeDateError');

      if (data && data.score) {
        delete data.score;
      }

      let record = await WeeklyReportRepository.create(
        data,
        {
          ...this.options,
          session,
        },
      );

      if (!record) throw new Error400();

      console.log("data.processes");
      console.log(data.processes);
      
      if (data.processes) {
         processes =
          await new ProcessReportCreateService(
            this.options,
          ).create(data.processes, record.id, language);
      }

      record.processes = processes;

      await MongooseRepository.commitTransaction(session);

      return record;
    } catch (error: any) {
      console.log(error.message);
      
      await MongooseRepository.abortTransaction(session);
      throw error;
    }
  }
}
