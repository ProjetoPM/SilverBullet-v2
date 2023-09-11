import MongooseRepository from '../../database/repositories/mongooseRepository';
import WeeklyEvaluationRepository from '../../database/repositories/weeklyEvaluationRepository';

import { IServiceOptions } from '../IServiceOptions';

import {metricGroups} from '../../mapping/weeklyReport';


export default class GetAllMetricsService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async handle() {
    return metricGroups;
  }
}
