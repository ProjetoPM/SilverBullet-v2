import MongooseRepository from '../../database/repositories/mongooseRepository';
import ProcessReportRepository from '../../database/repositories/processReportRepository';
import { groups } from '../../mapping/weeklyReport';
import { IServiceOptions } from '../IServiceOptions';
import { RequestWeeklyReport } from '../weeklyReport/createService';
import { IProcessReport } from '../../interfaces';

type Processes = Pick<RequestWeeklyReport, 'processes'>;

export default class ProcessReportCreateService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async create(
    { processes }: Processes,
    weeklyReportId: string,
    language: string,
    tenantId: string,
  ) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      let processesToReturn: IProcessReport[] = [];

      /**
       * Usando '!' uma vez que existe uma verificação anterior que garante
       * a existência de processos (WeeklyReportCreateService:66).
       */
      for (const process of processes!) {
        const group = groups.find(
          (group) => group.id === process.group,
        );

        const processName = group?.entities.find(
          (entity) => entity.id === process.name,
        );

        /**
         * Ignora o 'erro' e continua na próxima iteração,
         * evitando interromper o fluxo antes de chegar no
         * último item para garantir dados parciais, caso
         * exista itens posteriores válidos.
         */
        if (!group || !processName) {
          continue;
        }

        let record = await ProcessReportRepository.create(
          process,
          weeklyReportId,
          {
            ...this.options,
            session,
          },
        );

        if (record) {
          processesToReturn.push(record);
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
