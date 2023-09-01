import ProjectUserRepository from '../../database/repositories/projectUserRepository';
import MongooseRepository from '../../database/repositories/mongooseRepository';
import Error400 from '../../errors/Error400';
import { IServiceOptions } from '../IServiceOptions';
import UserRepository from '../../database/repositories/userRepository';
import { i18n } from '../../i18n';

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
    const returnResponse: string[] = [];
    for (const email of emails) {
      const res = await this.addUserToProjectOrUpdate(
        email,
        );
        returnResponse.push(res);
    }

    const isInvitesWithSuccess = returnResponse.some(response => response == 'success');
    if(!isInvitesWithSuccess) throw new Error400(this.options.language, 'tenant.project.errors.noInvitesSent');
    

    const isInvitesWithErrors = returnResponse.some(response => response == 'error');
    if(isInvitesWithErrors){
      const message = i18n(this.options.language, 'tenant.project.errors.inviteWithErrors');
      return {
        type: 'warn',
        message
      }
    }


    const message = i18n(this.options.language, 'tenant.project.successResponses.invitesSentSuccessfully');
    return {
      type: 'success',
       message
    }
  }

  async addUserToProjectOrUpdate({ email, role }: IEmail) {
    const allowedRoles = [
      'admin',
      'manager',
      'developer',
      'stakeholder',
      'professor',
    ];
    if (!allowedRoles.includes(role)) return 'error';

    const userRoles = [role];

    let user =
      await UserRepository.findByEmailWithoutAvatar(email, {
        ...this.options,
      });

    if (!user) return 'error';

    const isUserAlreadyInTenant = user.tenants.some(
      (userTenant) =>
        userTenant.tenant.id ===
        this.options.currentTenant.id,
    );

    if (!isUserAlreadyInTenant) return 'error';

    await ProjectUserRepository.updateRoles(
      this.options.currentProject.id,
      user.id,
      userRoles,
      {
        ...this.options,
        addRoles: true,
      },
    );

    return 'sucess';
  }
}
