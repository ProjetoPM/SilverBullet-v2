import MongooseRepository from '../../database/repositories/mongooseRepository';

import Error400 from '../../errors/Error400';
import { IServiceOptions } from '../IServiceOptions';

import WeeklyEvaluationRepository from '../../database/repositories/weeklyEvaluationRepository';
import WeeklyReportRepository from '../../database/repositories/weeklyReportRepository';
import ProcessReportUpdateService from '../processReport/updateService';
import ProcessReportCreateService from '../processReport/createService';
import { IProcessReport } from '../../interfaces';
import { supabase } from '../supabase';
import ProcessReportRepository from '../../database/repositories/processReportRepository';



export type UpdateRequestWeeklyReport = {
  toolEvaluation?: string;
  processes?: UpdateProcess[];
};

export type UpdateProcess = {
  id: string;
  group: string;
  name: string;
  description?: string;
  filesFolder: string;
};

export type ProcessToDelete = Pick<UpdateProcess, "id">;

type CreateProcess = Omit<UpdateProcess, "id">



export default class WeeklyReportUpdateService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async delete(
    id: string,
  ) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
    
      await MongooseRepository.commitTransaction(session);
      return;
    } catch (error: any) {
      throw error;
    } finally {
      await MongooseRepository.abortTransaction(session);
    }
  }
}
