import UserRepository from '../../database/repositories/userRepository';
import { IServiceOptions } from '../IServiceOptions';

import Roles from '../../security/roles';


export type IInviteRequest = {
  emails: IEmail[];
};

export type IEmail = {
  email: string;
  role: string;
};

export default class ListUsersByProjectService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }
  async handle() {
    return UserRepository.listUsersByProject(
      this.options
    );
  }
  
}
