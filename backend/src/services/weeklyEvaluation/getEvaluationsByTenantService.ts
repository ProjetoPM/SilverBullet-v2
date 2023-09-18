import MongooseRepository from '../../database/repositories/mongooseRepository';
import WeeklyEvaluationRepository from '../../database/repositories/weeklyEvaluationRepository';

import { IServiceOptions } from '../IServiceOptions';


export default class GetEvaluationsByTenantService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async handle() {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      let record = await WeeklyEvaluationRepository.getAllEvaluationsByTenant(
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
