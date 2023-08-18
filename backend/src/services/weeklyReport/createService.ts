import MongooseRepository from '../../database/repositories/mongooseRepository';

import Error400 from '../../errors/Error400';
import { IServiceOptions } from '../IServiceOptions';

import WeeklyEvaluationRepository from '../../database/repositories/weeklyEvaluationRepository';
import WeeklyReportRepository from '../../database/repositories/weeklyReportRepository';
import ProcessReportCreateService from '../processReport/createService';

export type Process = {
  group: string;
  name: string;
  content: IContent;
};

export type IContent = {
  folder: string;
  files: Array<IFile>;
};

export type IFile = {
  name: string;
}

export type RequestWeeklyReport = {
  weeklyEvaluationId: string;
  projectId: string;
  toolEvaluation: string;
  processes?: Process[];
};

export default class WeeklyReportCreateService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async create(
    data: RequestWeeklyReport,
    language: string,
    tenantId: string,
  ) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );
    
    try {
      const date = Date.now();
      const {weeklyEvaluationId, projectId, processes} = data;
      if (!weeklyEvaluationId) throw new Error400(language, 'tenant.weeklyReport.errors.missingWeeklyEvaluationId');
      if (!projectId) throw new Error400(language, 'tenant.weeklyReport.errors.missingProjectId');
      
      // @Not implemented yet
      // check if user is in project

      const isInRange =
        await WeeklyEvaluationRepository.verifySubmitDateRange(
          date,
          weeklyEvaluationId,
          this.options,
        );

      if (!isInRange)
        throw new Error400(
          language,
          'tenant.weeklyReport.errors.rangeDateError',
        );

      let record = await WeeklyReportRepository.create(
        data,
        {
          ...this.options,
          session,
        },
      );

      

      if (!record) throw new Error400();

      if (processes) {
        record.processes =
          await new ProcessReportCreateService(
            this.options,
          ).create(
            { processes },
            record.id,
            language,
            tenantId,
          );
      }

      await MongooseRepository.commitTransaction(session);
      return record;
    } catch (error: any) {
      MongooseRepository.handleUniqueFieldError(
        error,
        this.options.language,
        'activityDurationEstimates',
      );

      throw error;
    } finally {
      await MongooseRepository.abortTransaction(session);
    }
  }
}
