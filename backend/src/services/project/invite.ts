import ProjectUserRepository from '../../database/repositories/projectUserRepository';
import MongooseRepository from '../../database/repositories/mongooseRepository';
import Error400 from '../../errors/Error400';
import { IServiceOptions } from '../IServiceOptions';
import UserRepository from '../../database/repositories/userRepository';


export type IInviteRequest = {
  emails: IEmail[];
};

export type IEmail = {
  email: string;
  role: string;
};

export default class ProjectInviteService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async handle(data: IInviteRequest) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

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

      const res = await this.addOrUpdateAll(uniqueEmails);

      await MongooseRepository.commitTransaction(session);

      return res;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);
      throw error;
    }
  }

  async addOrUpdateAll(emails: IEmail[]) {
    const returnResponse: {
      email: string;
      status: string;
    }[] = [];
    for (const email of emails) {
      const res = await this.addUserToProjectOrUpdate(
        email,
      );
      returnResponse.push(res);
    }
    return returnResponse;
  }

  async addUserToProjectOrUpdate({ email, role }: IEmail) {
    const userRoles = [role];
    console.log(role);
    

    let user =
      await UserRepository.findByEmailWithoutAvatar(email, {
        ...this.options,
      });

      if(!user) throw new Error400();

      const isUserAlreadyInTenant = user.tenants.some(
        (userTenant) =>
          userTenant.tenant.id ===
          this.options.currentTenant.id,
      );

    if (!isUserAlreadyInTenant)
      return {
        email,
        status: 'Not in tenant',
      };

    await ProjectUserRepository.updateRoles(
      this.options.currentTenant.id,
      user.id,
      userRoles,
      {
        ...this.options,
        addRoles: true,
      },
    );

    return {
      email,
      status: 'Invited',
    };
  }
}
