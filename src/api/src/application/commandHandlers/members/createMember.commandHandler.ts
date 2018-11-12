import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import uuid from 'uuid';
import { CreateMemberCommand } from '../../commands/members/createMember.command';
import { SpacesRepository } from '../../../infrastructure/repositories/spaces.repository';
import { MembersRepository } from '../../../infrastructure/repositories/members.repository';
import { AuthService } from '../../../auth/auth.service';
import { InvalidArgumentException } from '../../../shared/exceptions/InvalidArgument.exception';
import { Member } from '../../../domain/members/member';

@CommandHandler(CreateMemberCommand)
export class CreateMemberCommandHandler
  implements ICommandHandler<CreateMemberCommand> {
  constructor(
    private readonly spacesRepository: SpacesRepository,
    private readonly membersRepository: MembersRepository,
    private readonly authService: AuthService,
  ) {}

  async execute(command: CreateMemberCommand) {
    const space = await this.spacesRepository.getById(command.spaceId);
    if (!space) throw new NotFoundException('Space not found');

    await space.state.members.forEach(async (id: string) => {
      const user = await this.authService.getUserInfoById(id);
      if (user.id === command.userId) {
        throw new InvalidArgumentException('User already added to this space.');
      }
    });

    const memberId = uuid.v4();
    space.addNewMember(memberId);

    const member = new Member(
      memberId,
      command.userId,
      command.spaceId,
      command.name,
    );
    await this.membersRepository.create(member.state);
    await this.spacesRepository.update(space.state);
  }
}
