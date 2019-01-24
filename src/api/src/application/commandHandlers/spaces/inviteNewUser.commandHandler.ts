import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InviteNewUserCommand } from '../../commands/spaces/inviteNewUser.command';

@CommandHandler(InviteNewUserCommand)
export class InviteNewUserCommandHandler
  implements ICommandHandler<InviteNewUserCommand> {
  // constructor(
  //   private readonly spacesRepository: SpacesRepository,
  //   private readonly authService: AuthService,
  // ) {}

  async execute(command: InviteNewUserCommand) {
    // const space = await this.spacesRepository.getById(command.spaceId);
    // if (!space) {
    //   throw new InvalidArgumentException(
    //     `Space with ${command.spaceId} doesn't exist.`,
    //   );
    // }
    // if (space.state.adminId !== command.applierId) {
    //   throw new InvalidArgumentException(
    //     "User doesn't have authority to assign new users.",
    //   );
    // }
    //
    // const invitedUserInfo = await this.authService.getUserInfoByEmail(
    //   command.userEmail,
    // );
    // if (!invitedUserInfo) throw new NotFoundException('User not found');
    // // space.addNewMember(invitedUserInfo.id);
    // await this.spacesRepository.update(space.state);
  }
}
