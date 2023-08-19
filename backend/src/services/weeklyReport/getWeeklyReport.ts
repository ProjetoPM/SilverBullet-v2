import MongooseRepository from '../../database/repositories/mongooseRepository';

import Error400 from '../../errors/Error400';
import { IServiceOptions } from '../IServiceOptions';

import WeeklyReportRepository from '../../database/repositories/weeklyReportRepository';

export default class GetWeeklyReportService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async findById(id:string) {
    
    return WeeklyReportRepository.findById(id, this.options);
  }
}
