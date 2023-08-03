import Error400 from '../errors/Error400';
import MongooseRepository from '../database/repositories/mongooseRepository';
import { IServiceOptions } from './IServiceOptions';
import ResourceRequirementsRepository from '../database/repositories/resourceRequirementsRepository';
import ActivityListRepository from '../database/repositories/activityListRepository';
import ResourceRepository from '../database/repositories/resourceRepository';

export default class ResourceRequirementsService {
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
      data.resource = await ResourceRepository.filterIdInTenant(data.resource, { ...this.options, session });

      const record = await ResourceRequirementsRepository.create(data, {
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
        'resourceRequirements',
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
      data.resource = await ResourceRepository.filterIdInTenant(data.resource, { ...this.options, session });

      const record = await ResourceRequirementsRepository.update(
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
        'resourceRequirements',
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
        await ResourceRequirementsRepository.destroy(id, {
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
    return ResourceRequirementsRepository.findById(id, this.options);
  }

  async findAllAutocomplete(search, limit) {
    return ResourceRequirementsRepository.findAllAutocomplete(
      search,
      limit,
      this.options,
    );
  }

  async findAndCountAll(args) {
    return ResourceRequirementsRepository.findAndCountAll(
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
    const count = await ResourceRequirementsRepository.count(
      {
        importHash,
      },
      this.options,
    );

    return count > 0;
  }
}
