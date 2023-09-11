import MongooseRepository from '../../database/repositories/mongooseRepository';
import WeeklyEvaluationRepository from '../../database/repositories/weeklyEvaluationRepository';

import Error400 from '../../errors/Error400';
import { IServiceOptions } from '../IServiceOptions';

import { metricGroups } from '../../mapping/weeklyReport';

export interface IWeeklyEvaluation {
  name: string;
  type: string;
  dates: IDates;
  metricGroupId: string;
}

export interface IDates {
  startDate: string;
  endDate: string;
}

export interface IRequest {
  data: IWeeklyEvaluation;
  weeklyEvaluationId: string;
}

export default class WeeklyEvaluationEditService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async handle(reqData: IRequest) {
    const { data, weeklyEvaluationId } = reqData;
    const {
      dates,
      metricGroupId,
      name,
      type,
    } = data;

    const { startDate, endDate } = dates;

    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    const metricGroup = metricGroups.find(
      (metric) => metric.metricGroupId === metricGroupId,
    );

    if (!startDate)
      throw new Error400(
        this.options.language,
        'tenant.weeklyEvaluation.errors.nullStartDate',
      );
    if (!endDate)
      throw new Error400(
        this.options.language,
        'tenant.weeklyEvaluation.errors.nullEndDate',
      );

    const startDateObject = new Date(startDate);
    const endDateObject = new Date(endDate);
    if (endDateObject.getTime() < startDateObject.getTime())
      throw new Error400(
        this.options.language,
        'tenant.weeklyEvaluation.errors.startDateGreaterThanEndDate',
      );

    if (!metricGroup)
      throw new Error400(
        this.options.language,
        'tenant.weeklyEvaluation.errors.invalidMetricGroup',
      );

    const dataToUpdate = {
      name,
      type,
      startDate,
      endDate,
      metrics: metricGroup.metrics,
    };

    try {
      let record = await WeeklyEvaluationRepository.update(
        weeklyEvaluationId,
        dataToUpdate,
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
