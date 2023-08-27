import MongooseRepository from '../../database/repositories/mongooseRepository';
import WeeklyEvaluationRepository from '../../database/repositories/weeklyEvaluationRepository';

import Error400 from '../../errors/Error400';
import { IServiceOptions } from '../IServiceOptions';

import { metricGroups } from '../../mapping/weeklyReport';
import { IWeeklyEvaluation } from '../../interfaces';

export interface IRequest {
  name: string;
  type: string;
  startDate: Date | string;
  endDate: Date | string;
  metricGroupId: string;
}

export default class WeeklyEvaluationCreateService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async create({
    name,
    type,
    startDate,
    endDate,
    metricGroupId,
  }: IRequest) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    if (!startDate || !endDate) throw new Error400();

    const metricGroup = metricGroups.find(
      (metric) => metric.id === metricGroupId,
    );

    if (!metricGroup) throw new Error400();

    const data = {
      name,
      type,
      startDate,
      endDate,
      metrics: metricGroup.metrics,
    };

    
    try {
      let record = await WeeklyEvaluationRepository.create(
        data,
        {
          ...this.options,
          session,
        },
      );

      await MongooseRepository.commitTransaction(session);

      return record;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);
      throw error;
    }
  }
}
