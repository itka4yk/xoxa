import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CreateNewSpaceCommand } from '../../commands/spaces/createNewSpace.command';
import { SpacesRepository } from '../../../infrastructure/repositories/spaces.repository';
import uuid from 'uuid';
import { InvalidArgumentException } from 'shared/exceptions/InvalidArgument.exception';
import { ISpaceState, IMemberState, SpaceModel } from 'domain/space.model';
import { SpaceCreatedEvent } from '../../events/spaceCreated.event';

@CommandHandler(CreateNewSpaceCommand)
export class CreateNewSpaceCommandHandler
  implements ICommandHandler<CreateNewSpaceCommand> {
  constructor(
    private readonly spacesRepository: SpacesRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateNewSpaceCommand) {
    const space = await this.spacesRepository.dbSet.findOne({
      name: command.name,
    });
    if (space) {
      throw new InvalidArgumentException(
        `Space with name ${command.name} already exists!`,
      );
    }

    const spaceId: string = uuid.v4();

    const memberId = uuid.v4();

    const admin: IMemberState = {
      userId: command.adminId,
      name: command.adminName,
      id: memberId,
    };

    const newSpace = new SpaceModel({
      id: spaceId,
      name: command.name,
      adminId: command.adminId,
      members: [],
      channels: [],
    } as ISpaceState);

    newSpace.addNewMember(admin);
    await this.spacesRepository.create(newSpace.state);
    this.eventBus.publish(
      new SpaceCreatedEvent({ spaceId, userId: command.adminId }),
    );
  }
}
