import Error400 from '../errors/Error400';
import MongooseRepository from '../database/repositories/mongooseRepository';
import { IServiceOptions } from './IServiceOptions';
import StakeholderCalendarsRepository from '../database/repositories/stakeholderCalendarsRepository';
import ActivityListRepository from '../database/repositories/activityListRepository';
import StakeholderRegistrationRepository from '../database/repositories/stakeholderRegistrationRepository';

export default class StakeholderCalendarsService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async create(data) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      data.activity = await ActivityListRepository.filterIdInTenant(data.activity, { ...this.options, session });
      data.stakeholder = await StakeholderRegistrationRepository.filterIdInTenant(data.stakeholder, { ...this.options, session });

      const record = await StakeholderCalendarsRepository.create(data, {
        ...this.options,
        session,
      });

      await MongooseRepository.commitTransaction(session);

      return record;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);

      MongooseRepository.handleUniqueFieldError(
        error,
        this.options.language,
        'stakeholderCalendars',
      );

      throw error;
    }
  }

  async update(id, data) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      data.activity = await ActivityListRepository.filterIdInTenant(data.activity, { ...this.options, session });
      data.stakeholder = await StakeholderRegistrationRepository.filterIdInTenant(data.stakeholder, { ...this.options, session });

      const record = await StakeholderCalendarsRepository.update(
        id,
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

      MongooseRepository.handleUniqueFieldError(
        error,
        this.options.language,
        'stakeholderCalendars',
      );

      throw error;
    }
  }

  async destroyAll(ids) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      for (const id of ids) {
        await StakeholderCalendarsRepository.destroy(id, {
          ...this.options,
          session,
        });
      }

      await MongooseRepository.commitTransaction(session);
    } catch (error) {
      await MongooseRepository.abortTransaction(session);
      throw error;
    }
  }

  async findById(id) {
    return StakeholderCalendarsRepository.findById(id, this.options);
  }

  async findAllAutocomplete(search, limit) {
    return StakeholderCalendarsRepository.findAllAutocomplete(
      search,
      limit,
      this.options,
    );
  }

  async findAndCountAll(args) {
    return StakeholderCalendarsRepository.findAndCountAll(
      args,
      this.options,
    );
  }

  async import(data, importHash) {
    if (!importHash) {
      throw new Error400(
        this.options.language,
        'importer.errors.importHashRequired',
      );
    }

    if (await this._isImportHashExistent(importHash)) {
      throw new Error400(
        this.options.language,
        'importer.errors.importHashExistent',
      );
    }

    const dataToCreate = {
      ...data,
      importHash,
    };

    return this.create(dataToCreate);
  }

  async _isImportHashExistent(importHash) {
    const count = await StakeholderCalendarsRepository.count(
      {
        importHash,
      },
      this.options,
    );

    return count > 0;
  }
}
