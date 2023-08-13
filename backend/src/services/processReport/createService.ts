import MongooseRepository from '../../database/repositories/mongooseRepository';
import ProcessReportRepository from '../../database/repositories/processReportRepository';
import Error400 from '../../errors/Error400';
import { groups } from '../../mapping/weeklyReport';
import { IServiceOptions } from '../IServiceOptions';
import { RequestWeeklyReport } from '../weeklyReport/createService';

type Processes = Pick<RequestWeeklyReport, 'processes'>;

export default class ProcessReportCreateService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async create(
    data: Processes,
    weeklyReportId: string,
    language: string,
  ) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      let processes: Processes[] = [];

      /**
       * Usando '!' uma vez que existe uma verificação anterior que garante
       * a existência de processos (WeeklyReportCreateService:66).
       */
      for (const process of data.processes!) {
        const group = groups.find(
          (group) => group.id === process.group,
        );

        if (!group) break;

        const processName = group.entities.find(
          (entity) => entity.id === process.name,
        );

        if (!processName) break;

        let record = await ProcessReportRepository.create(
          weeklyReportId,
          process,
          {
            ...this.options,
            session,
          },
        );

        if (record) {
          processes.push(record);
        }
      }

      await MongooseRepository.commitTransaction(session);

      return processes;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);
      throw error;
    }
  }
}
