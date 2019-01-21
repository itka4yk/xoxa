import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SpacesRepository } from '../../../infrastructure/repositories/spaces.repository';
import { InvalidArgumentException } from 'shared/exceptions/InvalidArgument.exception';
import { InviteNewUserCommand } from '../../commands/spaces/inviteNewUser.command';
import { AuthService } from '../../../auth/auth.service';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(InviteNewUserCommand)
export class InviteNewUserCommandHandler
  implements ICommandHandler<InviteNewUserCommand> {
  constructor(
    private readonly spacesRepository: SpacesRepository,
    private readonly authService: AuthService,
  ) {}

  async execute(command: InviteNewUserCommand) {
    const space = await this.spacesRepository.getById(command.spaceId);
    if (!space) {
      throw new InvalidArgumentException(
        `Space with ${command.spaceId} doesn't exist.`,
      );
    }
    if (space.state.admin !== command.applierId) {
      throw new InvalidArgumentException(
        "User doesn't have authority to assign new users.",
      );
    }

    const invitedUserInfo = await this.authService.getUserInfoByEmail(
      command.userEmail,
    );
    if (!invitedUserInfo) throw new NotFoundException('User not found');
    space.addNewMember(invitedUserInfo.id);
    await this.spacesRepository.update(space.state);
  }
}
