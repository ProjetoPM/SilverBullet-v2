import MongooseRepository from '../../database/repositories/mongooseRepository';
import WeeklyReportRepository from '../../database/repositories/weeklyReportRepository';
import Roles from '../../security/roles';
const ProjectRoles = Roles.projectValues;
import { IServiceOptions } from '../IServiceOptions';

import { IMetric } from '../../interfaces';
import Error400 from '../../errors/Error400';
import Error403 from '../../errors/Error403';

export default class WeeklyReportEvaluateService {
  options: IServiceOptions;

  constructor(options: IServiceOptions) {
    this.options = options;
  }

  async handle(weeklyReportId: string, score: IMetric) {
    const projectRoleToBeVerified = ProjectRoles.professor;

    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      const weeklyReport =
        await WeeklyReportRepository.findById(
          weeklyReportId,
          this.options,
        );

      const { id: currentTenantId } =
        MongooseRepository.getCurrentTenant(this.options);

      const { projects: projectsUser } =
        MongooseRepository.getCurrentUser(this.options);

      console.log(projectsUser);

      if (!weeklyReport)
        throw new Error400(
          this.options.language,
          'tenant.weeklyReport.errors.notFound',
        );

      const {
        project: weeklyReportProject,
        tenant: weeklyReportTenant,
      } = weeklyReport;

      if (currentTenantId != weeklyReportTenant)
        throw new Error400(
          this.options.language,
          'tenant.weeklyReport.errors.reportNotBelongToTenant',
        );

      const projectFound = projectsUser.find(
        (projectUser) =>
          projectUser.project.id == weeklyReportProject.id,
      );

      if (!projectFound)
        throw new Error403(
          this.options.language,
          'tenant.weeklyReport.errors.notInProject',
        );
      const { roles: projectRoles } = projectFound;

      const isProfessor = projectRoles.some(
        (role: string) => role === projectRoleToBeVerified,
      );

      if (!isProfessor)
        throw new Error403(
          this.options.language,
          'tenant.weeklyReport.errors.notProfessorEvaluate',
        );

      await WeeklyReportRepository.updateScore(
        weeklyReportId,
        score,
        this.options,
      );

      await MongooseRepository.commitTransaction(session);
    } catch (error: any) {
      throw error;
    } finally {
      await MongooseRepository.abortTransaction(session);
    }
  }
}
