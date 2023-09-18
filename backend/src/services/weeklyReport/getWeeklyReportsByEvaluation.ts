import MongooseRepository from '../../database/repositories/mongooseRepository';

import Error400 from '../../errors/Error400';
import { IServiceOptions } from '../IServiceOptions';

import WeeklyReportRepository from '../../database/repositories/weeklyReportRepository';

export default class GetWeeklyReportsByEvaluationService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async handle(id: string) {
  
    return WeeklyReportRepository.getReportsByEvaluationIdIncludingUser(id, this.options);
  }
}
