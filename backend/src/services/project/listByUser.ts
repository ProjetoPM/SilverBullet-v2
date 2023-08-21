import ProjectUserRepository from '../../database/repositories/projectUserRepository';
import MongooseRepository from '../../database/repositories/mongooseRepository';
import Error400 from '../../errors/Error400';
import { IServiceOptions } from '../IServiceOptions';

import Roles from '../../security/roles';


export type IInviteRequest = {
  emails: IEmail[];
};

export type IEmail = {
  email: string;
  role: string;
};

export default class ListProjectsByUserService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }
  async handle() {
    return ProjectUserRepository.findProjectsByUser(
      this.options
    );
  }
  
}
