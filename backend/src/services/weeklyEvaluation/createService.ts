import MongooseRepository from '../../database/repositories/mongooseRepository';
import WeeklyEvaluationRepository from '../../database/repositories/weeklyEvaluationRepository';

import Error400 from '../../errors/Error400';
import { IServiceOptions } from '../IServiceOptions';

import { metricGroups } from '../../mapping/weeklyReport';
import { IWeeklyEvaluation } from '../../interfaces';

export interface IRequest {
  name: string;
  type: string;
  dates: IDates;
  metricGroupId: string;
}

export interface IDates {
  startDate: string;
  endDate: string;
}

export default class WeeklyEvaluationCreateService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async create({
    name,
    type,
    dates,
    metricGroupId,
  }: IRequest) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    const {startDate, endDate} = dates;
    
    if (!startDate) throw new Error400(this.options.language, 'tenant.weeklyEvaluation.errors.nullStartDate');
    if (!endDate) throw new Error400(this.options.language, 'tenant.weeklyEvaluation.errors.nullEndDate');

    const startDateObject = new Date(startDate);
    const endDateObject = new Date(endDate);
    if(endDateObject.getTime() < startDateObject.getTime()) throw new Error400(this.options.language, 'tenant.weeklyEvaluation.errors.startDateGreaterThanEndDate');
    const metricGroup = metricGroups.find(
      (metric) => metric.id === metricGroupId,
    );

    if (!metricGroup) throw new Error400(this.options.language, 'tenant.weeklyEvaluation.errors.invalidMetricGroup');

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
