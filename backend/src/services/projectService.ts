import ProjectRepository from '../database/repositories/projectRepository';
import ProjectTenantRepository from '../database/repositories/projectTenantRepository';
import ProjectUserRepository from '../database/repositories/projectUserRepository';
import MongooseRepository from '../database/repositories/mongooseRepository';
import Error400 from '../errors/Error400';
import { IServiceOptions } from './IServiceOptions';

import Roles from '../security/roles';

import { IProject } from '../interfaces';

export type IInviteRequest = {
  emails: IEmail[];
};

export type IEmail = {
  email: string;
  role: string;
};

export default class ProjectService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async create(data: IProject) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    const roles: string[] = [
      Roles.projectValues.admin,
      Roles.projectValues.manager,
    ];
    try {
      if (data.name) {
        const projects =
          await ProjectRepository.findAndCountAll(
            { filter: {} },
            this.options,
          );

        const projectWithSameNameExists =
          projects.rows.filter((project) => {
            if (project.name == data.name) {
              return project;
            }
          });

        if (projectWithSameNameExists.length > 0) {
          throw new Error400(
            this.options.language,
            'tenant.project.errors.projectWithSameName',
          );
        }
      }

      let record = await ProjectRepository.create(data, {
        ...this.options,
        session,
      });

      await ProjectTenantRepository.create(record, {
        ...this.options,
        session,
      });

      await ProjectUserRepository.create(
        record,
        {
          ...this.options,
          session,
        },
        roles,
      );

      await MongooseRepository.commitTransaction(session);

      return record;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);
      throw error;
    }
  }

  async update(id, data) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      const record = await ProjectRepository.update(
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
        'entities.projectCharter',
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
        await ProjectRepository.destroy(id, {
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

  async findById(id: string, options?): Promise<IProject> {
    options = options || {};

    return ProjectRepository.findById(id, {
      ...this.options,
      ...options,
    });
  }

  async findAndCountAll(args) {
    return ProjectRepository.findAndCountAll(
      args,
      this.options,
    );
  }

  async invite(data: IInviteRequest, tenantId: string, projectId: string) {
    const { emails } = data;
    try {
      if (!emails) throw new Error400();

      const uniqueEmails = emails.filter(
        (item, index, array) => {
          return (
            array.findIndex(
              (prevItem) => prevItem.email === item.email,
            ) === index
          );
        },
      );


    } catch (error) {}
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
    const count = await ProjectRepository.count(
      {
        importHash,
      },
      this.options,
    );

    return count > 0;
  }
}
