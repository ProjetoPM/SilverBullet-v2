import ProjectUserRepository from '../../database/repositories/projectUserRepository';
import MongooseRepository from '../../database/repositories/mongooseRepository';
import Error400 from '../../errors/Error400';
import { IServiceOptions } from '../IServiceOptions';
import UserRepository from '../../database/repositories/userRepository';
import Error404 from '../../errors/Error404';

export type IAcceptOrDeclineRequest = {
  option: string;
  token: string;
};

export default class JoinOrDeclineInvitationService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async handle({ option, token }: IAcceptOrDeclineRequest) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      const allowedOptions = ['accept', 'decline'];

      if (!option || !token) throw new Error400();
      if (!allowedOptions.includes(option))
        throw new Error400();

      const projectUser =
        await ProjectUserRepository.findByInvitationToken(
          token,
          {
            ...this.options,
            session,
          },
        );

      console.log('projectUser');
      
      const tenantId = projectUser.project.tenant;
      console.log(tenantId);
      console.log(typeof tenantId);

      const { tenants } = projectUser.user;

      const isUserAlreadyInTenant = tenants.some(
        (userTenant) => {
          console.log("userTenant.tenant.id");
          console.log(userTenant.tenant.id);
          console.log(typeof userTenant.tenant.id);

          if (userTenant.tenant.id == tenantId) {
            return userTenant;
          }
        },
      );

      if (!isUserAlreadyInTenant)
        throw new Error400(
          this.options.language,
          'tenant.project.errors.userNotInTenant',
        );

      if (
        !projectUser ||
        projectUser.status !== 'invited'
      ) {
        throw new Error404();
      }

      if (option == 'decline') {
        await ProjectUserRepository.destroy(
          projectUser.project.id,
          this.options.currentUser.id,
          {
            ...this.options,
            session,
            currentProject: { id: projectUser.project.id },
          },
        );

        return 'declined';
      }

      await ProjectUserRepository.acceptInvitation(token, {
        ...this.options,
        currentProject: { id: projectUser.project.id },
        session,
      });
      await MongooseRepository.commitTransaction(session);

      return 'accepted';
    } catch (error) {
      await MongooseRepository.abortTransaction(session);
      throw error;
    }
  }
}
