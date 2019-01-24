import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import uuid from 'uuid';
import { CreateMemberCommand } from '../../commands/members/createMember.command';
import { SpacesRepository } from '../../../infrastructure/repositories/spaces.repository';
import { IMemberState } from '../../../domain/space.model';
import { MemberCreatedEvent } from '../../events/memberCreated.event';

@CommandHandler(CreateMemberCommand)
export class CreateMemberCommandHandler
  implements ICommandHandler<CreateMemberCommand> {
  constructor(
    private readonly spacesRepository: SpacesRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateMemberCommand) {
    const space = await this.spacesRepository.getById(command.spaceId);
    if (!space) throw new NotFoundException('Space not found');

    const member = {
      userId: command.userId,
      name: command.name,
      spaceId: command.spaceId,
      id: uuid.v4(),
    } as IMemberState;

    space.addNewMember(member);

    await this.spacesRepository.update(space);
    this.eventBus.publish(
      new MemberCreatedEvent({
        userId: command.userId,
        spaceId: space.state.id,
      }),
    );
  }
}
