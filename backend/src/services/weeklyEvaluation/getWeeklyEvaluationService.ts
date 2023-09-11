import MongooseRepository from '../../database/repositories/mongooseRepository';

import Error400 from '../../errors/Error400';
import { IServiceOptions } from '../IServiceOptions';

import WeeklyEvaluationRepository from '../../database/repositories/weeklyEvaluationRepository';

export default class GetWeeklyEvaluationService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async findById(id:string) {
    
    return WeeklyEvaluationRepository.findById(id, this.options);
  }
}
