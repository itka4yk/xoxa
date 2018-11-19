import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import uuid from 'uuid';
import { CreateMemberCommand } from '../../commands/members/createMember.command';
import { SpacesRepository } from '../../../infrastructure/repositories/spaces.repository';
import { MembersRepository } from '../../../infrastructure/repositories/members.repository';
import { InvalidArgumentException } from '../../../shared/exceptions/InvalidArgument.exception';
import { Member } from '../../../domain/members/member';

@CommandHandler(CreateMemberCommand)
export class CreateMemberCommandHandler
  implements ICommandHandler<CreateMemberCommand> {
  constructor(
    private readonly spacesRepository: SpacesRepository,
    private readonly membersRepository: MembersRepository,
  ) {}

  async execute(command: CreateMemberCommand) {
    const space = await this.spacesRepository.getById(command.spaceId);
    if (!space) throw new NotFoundException('Space not found');

    if (!space.state.members.includes(command.userId)) {
      throw new InvalidArgumentException("User can't be add to this space.");
    }

    const members = await this.membersRepository.get();
    if (
      members.find(
        m =>
          m.state.userId === command.userId &&
          m.state.spaceId === command.spaceId,
      )
    ) {
      throw new InvalidArgumentException('User already added to this space.');
    }

    const memberId = uuid.v4();

    const member = new Member({
      userId: command.userId,
      name: command.name,
      spaceId: command.spaceId,
      id: memberId,
    } as any);
    await this.membersRepository.create(member.state);
  }
}
