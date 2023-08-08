import MongooseRepository from '../../database/repositories/mongooseRepository';

import Error400 from '../../errors/Error400';
import { IServiceOptions } from '../IServiceOptions';

import weeklyReportMapping from '../../mapping/weeklyReport';
import { IWeeklyReport } from '../../interfaces';
import WeeklyReportRepository from '../../database/repositories/weeklyReportRepository';
import WeeklyEvaluationRepository from '../../database/repositories/weeklyEvaluationRepository';


export default class ProjectService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async create(data: IWeeklyReport, weeklyEvaluationId: string, language: string){
    const session = await MongooseRepository.createSession(
      this.options.database,
    );


    
    try{

      const date = Date.now();

      const isInRange = await WeeklyEvaluationRepository.verifySubmitDateRange(date, weeklyEvaluationId, this.options);
        console.log(isInRange);

        if(!isInRange) throw new Error400(language);

        if(data && data.score){
          delete data.score;
        }
        
      let record = await WeeklyReportRepository.create(data, weeklyEvaluationId,{
        ...this.options,
        session,
      });

      await MongooseRepository.commitTransaction(session);

      return record;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);
      throw error;
    }
  }
}
