import { supabase } from '../supabase';
import MongooseRepository from '../../database/repositories/mongooseRepository';
import ProcessReportRepository from '../../database/repositories/processReportRepository';
import { IServiceOptions } from '../IServiceOptions';
import { IProcessToDelete } from '../weeklyReport/deleteService';

export default class ProcessReportDeleteService {
  options: IServiceOptions;

  constructor(options: IServiceOptions) {
    this.options = options;
  }

  async handle(data: IProcessToDelete[]) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      for (const processToDelete of data) {
        this.delete(processToDelete);
      }

      await MongooseRepository.commitTransaction(session);
    } catch (error) {
      await MongooseRepository.abortTransaction(session);
      throw error;
    }
  }

  async delete(data: IProcessToDelete) {
    const { id, filesFolder } = data;

    await ProcessReportRepository.destroy(id, this.options);

    const { data: files } = await supabase.storage
      .from('weekly-report')
      .list(filesFolder);
    const filesWithFolder: string[] = [];

    files.map((file) => {
      filesWithFolder.push(`${filesFolder}/${file.name}`);
    });

    await supabase.storage
      .from('weekly-report')
      .remove(filesWithFolder);
  }
}
