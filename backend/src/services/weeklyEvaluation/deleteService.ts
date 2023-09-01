import MongooseRepository from '../../database/repositories/mongooseRepository';
import WeeklyEvaluationRepository from '../../database/repositories/weeklyEvaluationRepository';
import WeeklyReportRepository from '../../database/repositories/weeklyReportRepository';
import ProcessReportRepository from '../../database/repositories/processReportRepository';
import WeeklyReportDeleteService from '../weeklyReport/deleteService';
import { IServiceOptions } from '../IServiceOptions';
import { i18n } from '../../i18n';
import Error400 from '../../errors/Error400';

export default class WeeklyEvaluationDeleteService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async handle(data: string[]) {
    let deleteResponse: string[] = [];

    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      const { id: userId } =
        MongooseRepository.getCurrentUser(this.options);

      for (const id of data) {
        deleteResponse.push(await this.delete(id, userId));
      }

      const isDeletionWithSuccess = deleteResponse.some(
        (response) => response == 'success',
      );
      if (!isDeletionWithSuccess)
        throw new Error400(
          this.options.language,
          'tenant.weeklyEvaluation.errors.allEvaluationsUnsuccessfullyDeleted',
        );

      const isDeletionWithErrors = deleteResponse.some(
        (response) => response == 'error',
      );
      if (isDeletionWithErrors) {
        const message = i18n(
          this.options.language,
          'tenant.weeklyEvaluation.errors.someEvaluationsUnsuccessfullyDeleted',
        );
        return {
          partial: message,
        };
      }

      const message = i18n(
        this.options.language,
        'tenant.weeklyEvaluation.successResponses.evaluationsSuccessfullyDeleted',
      );
      return {
        success: message,
      };
      
    } catch (error: any) {
      throw error;
    } finally {
      await MongooseRepository.abortTransaction(session);
    }
  }

  async delete(id: string, userId: string) {
    let reportsToDelete: any = [];

    const weeklyEvaluation =
      await WeeklyEvaluationRepository.findById(
        id,
        this.options,
      );

    if (!weeklyEvaluation) return 'error';

    if (weeklyEvaluation.createdBy != userId)
      return 'error';

    WeeklyEvaluationRepository.destroy(id, this.options);

    const { rows: weeklyReports } =
      await WeeklyReportRepository.getReportsByEvaluationId(
        id,
        this.options,
      );

    weeklyReports.map((weeklyReport) =>
      reportsToDelete.push(weeklyReport.id),
    );

    await new WeeklyReportDeleteService(
      this.options,
    ).handleDeleteFromWeeklyEvaluation(reportsToDelete);

    return 'success';
  }
}
