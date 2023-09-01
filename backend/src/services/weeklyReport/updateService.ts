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

  async update(
    weeklyReportId: string,
    data: UpdateRequestWeeklyReport
  ) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      const date = Date.now();
      const { processes } = data;

      const weeklyReport = await WeeklyReportRepository.findById(weeklyReportId, this.options);
      const { weeklyEvaluation: weeklyEvaluationId } = weeklyReport;

      const { id: tenantId } =
      await MongooseRepository.getCurrentTenant(
        this.options,
      );
    const { id: userId } =
      await MongooseRepository.getCurrentUser(this.options);

      // Check if user created the report
      // Not implemented yet

    const language = this.options.language;
    
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

      let record = await WeeklyReportRepository.update(
        weeklyReportId,
        language,
        data,
        {
          ...this.options,
          session,
        },
      );

      if (!record) throw new Error400();

      if (!processes) return record;

      const {rows: dbProcesses} = await ProcessReportRepository.getProcessesByWeeklyReportId(weeklyReportId, this.options);

      const processesWithoutId: CreateProcess[] = processes.filter(process => process.id == undefined);
      
      const processesWithtId: UpdateProcess[] = processes.filter(process => process.id);

      
      processesWithtId.map(({id}) => {
        const findProcess = dbProcesses.findIndex(process => process.id == id);
        if(findProcess != -1){
          dbProcesses.splice(findProcess, 1);
        }
      })

      console.log('dbProcesses');
      console.log(dbProcesses);

      for (const dbProcess of dbProcesses) {
        await ProcessReportRepository.destroy(dbProcess.id, this.options);
        const { filesFolder } = dbProcess;

        const {data: files, } = await supabase.storage.from('weekly-report').list(dbProcess.filesFolder);
        if(!files) break;
        const filesWithFolder:string[] = [];

        files.map(file => {
          filesWithFolder.push(`${filesFolder}/${file.name}`);
        });

        await supabase.storage.from ('weekly-report').remove (filesWithFolder);
      }
      

      for (const process of processesWithtId) {
          await new ProcessReportUpdateService(
            this.options,
          ).update(process, process.id!);
        }
           
        await new ProcessReportCreateService(this.options).create({processes: processesWithoutId}, weeklyReportId, language, tenantId);
      await MongooseRepository.commitTransaction(session);
      return record;
    } catch (error: any) {
      throw error;
    } finally {
      await MongooseRepository.abortTransaction(session);
    }
  }
}
