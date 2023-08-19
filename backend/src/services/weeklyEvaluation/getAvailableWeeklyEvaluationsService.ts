import MongooseRepository from '../../database/repositories/mongooseRepository';
import WeeklyEvaluationRepository from '../../database/repositories/weeklyEvaluationRepository';

import { IServiceOptions } from '../IServiceOptions';


export default class GetAvailableWeeklyEvaluationsService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async getAvailableWeeklyEvaluations() {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      let record = await WeeklyEvaluationRepository.getAvailableEvaluations(
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
