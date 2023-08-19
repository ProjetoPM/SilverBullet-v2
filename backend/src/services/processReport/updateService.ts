import MongooseRepository from '../../database/repositories/mongooseRepository';
import ProcessReportRepository from '../../database/repositories/processReportRepository';
import Error400 from '../../errors/Error400';
import { IProcessReport } from '../../interfaces';
import { groups } from '../../mapping/weeklyReport';
import { IServiceOptions } from '../IServiceOptions';
import {UpdateProcess} from '../weeklyReport/updateService';


export default class ProcessReportUpdateService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async update(
    data: UpdateProcess,
    processId: string
  ) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {   
      /**
       * Usando '!' uma vez que existe uma verificação anterior que garante
       * a existência de processos (WeeklyReportCreateService:66).
       */
      
        const group = groups.find(
          (group) => group.id === data.group,
        );

        const processName = group?.entities.find(
          (entity) => entity.id === data.name,
        );

        /**
         * Ignora o 'erro' e continua na próxima iteração,
         * evitando interromper o fluxo antes de chegar no
         * último item para garantir dados parciais, caso
         * exista itens posteriores válidos.
         */
        if (!group || !processName) {
          return;
        }

        let record:IProcessReport = await ProcessReportRepository.update(
          processId,
          data,
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
