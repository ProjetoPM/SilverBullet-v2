import Error400 from '../errors/Error400';
import MongooseRepository from '../database/repositories/mongooseRepository';
import { IServiceOptions } from './IServiceOptions';

import UserRepository from '../database/repositories/userRepository';
import StakeholderRegistrationRepository from '../database/repositories/stakeholderRegistrationRepository';
import { i18n } from '../i18n';

export default class StakeholderRegistrationService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async create(data) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      let record: any;

      if (!data.user) {
        record = this.createWithoutUser(data);

      } else {
        record = this.createWithAssociatedUser(data);
      }

      await MongooseRepository.commitTransaction(session);

      return {
        type: 'success',
        message: i18n(
          this.options.language,
          'entities.stakeholderRegistration.successResponse.created',
        ),
        data: record,
      };
    } catch (error) {
      await MongooseRepository.abortTransaction(session);

      MongooseRepository.handleUniqueFieldError(
        error,
        this.options.language,
        'entities.stakeholderRegistration',
      );

      throw error;
    }
  }

  async createWithAssociatedUser(data) {
    const { rows: projectUsers } =
      await UserRepository.listUsersByTenantAndProject(
        this.options,
      );

    const userInProject = projectUsers.find(
      (user) => user.id == data.user,
    );

    if (!userInProject) {
      throw new Error400(
        this.options.language,
        'entities.stakeholderRegistration.errors.stakeholderNotInProject',
      );
    }

    const {email, projects} = userInProject;

    const { id: currentProjectId } = MongooseRepository.getCurrentProject(this.options);

    const userProject = projects.find((project:any) => project.id == currentProjectId); 
    const [ role ] = userProject.roles;

    data.email = email;
    data.positionInOrganization = role;


    const record =
      await StakeholderRegistrationRepository.create(data, {
        ...this.options,
      });

    return record;
  }

  async createWithoutUser(data) {
    const record =
      await StakeholderRegistrationRepository.create(data, {
        ...this.options,
      });
  
    return record;
  }

  async update(id, data) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      const record =
        await StakeholderRegistrationRepository.update(
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
        'entities.stakeholderRegistration',
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
        await StakeholderRegistrationRepository.destroy(
          id,
          {
            ...this.options,
            session,
          },
        );
      }

      await MongooseRepository.commitTransaction(session);
    } catch (error) {
      await MongooseRepository.abortTransaction(session);
      throw error;
    }
  }

  async findById(id) {
    return StakeholderRegistrationRepository.findById(
      id,
      this.options,
    );
  }

  async findAllAutocomplete(search, limit) {
    return StakeholderRegistrationRepository.findAllAutocomplete(
      search,
      limit,
      this.options,
    );
  }

  async findAndCountAll(args) {
    return StakeholderRegistrationRepository.findAndCountAll(
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
    const count =
      await StakeholderRegistrationRepository.count(
        {
          importHash,
        },
        this.options,
      );

    return count > 0;
  }
}
