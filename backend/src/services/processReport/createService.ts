import MongooseRepository from '../../database/repositories/mongooseRepository';

import Error400 from '../../errors/Error400';
import { IServiceOptions } from '../IServiceOptions';
import weeklyReportMapping from '../../mapping/weeklyReport';

import { IProcessReport, IWeeklyReport } from '../../interfaces';
import ProcessReportRepository from '../../database/repositories/processReportRepository';


export default class ProcessReportCreateService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async create(data: Array<IProcessReport>, weeklyReportId: string, language: string){
    const session = await MongooseRepository.createSession(
      this.options.database,
    );


    
    try{

      let processes: Array<any> = [];
      for (const process of data) {
        const phase = weeklyReportMapping.phases.find(phase => phase.key === process.processPhase);
        if(!phase) break;
        const processName = phase.entities.find(entity => entity.key === process.processName);
        if(!processName) break;

        process.weeklyReport = weeklyReportId;

        let record = await ProcessReportRepository.create(process, {
          ...this.options,
          session,
        });

        if(record){

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
