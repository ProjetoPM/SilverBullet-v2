import MongooseRepository from '../../database/repositories/mongooseRepository';

import Error400 from '../../errors/Error400';
import { IServiceOptions } from '../IServiceOptions';

import WeeklyEvaluationRepository from '../../database/repositories/weeklyEvaluationRepository';
import WeeklyReportRepository from '../../database/repositories/weeklyReportRepository';
import UserRepository from '../../database/repositories/userRepository';
import ProcessReportCreateService from '../processReport/createService';
import { IProject } from '../../interfaces';

export type Process = {
  group: string;
  name: string;
  description?: string;
  filesFolder: string;
};

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
    userId: string,
  ) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      const date = Date.now();
      const { weeklyEvaluationId, projectId, processes } =
        data;
      if (!weeklyEvaluationId)
        throw new Error400(
          language,
          'tenant.weeklyReport.errors.missingWeeklyEvaluationId',
        );
      if (!projectId)
        throw new Error400(
          language,
          'tenant.weeklyReport.errors.missingProjectId',
        );

      const user = await UserRepository.findById(
        userId,
        this.options,
      );
      const { projects } = user;

      const projectFound: IProject = projects.find(
        ({ id }) => projectId == id,
      );
      if (!projectFound)
        throw new Error400(
          language,
          'tenant.weeklyReport.errors.notInProject',
        );
      const projectInTenant =
        projectFound.tenant == tenantId;
      if (!projectInTenant)
        throw new Error400(
          language,
          'tenant.weeklyReport.errors.notInProject',
        );
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
        'tenant.weeklyReport',
      );

      throw error;
    } finally {
      await MongooseRepository.abortTransaction(session);
    }
  }
}
