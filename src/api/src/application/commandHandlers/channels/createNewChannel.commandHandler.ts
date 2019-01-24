import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import uuid from 'uuid';

import { CreateNewChannelCommand } from '../../commands/channels/createNewChannel.command';
import { SpacesRepository } from '../../../infrastructure/repositories/spaces.repository';
import { IChannelState } from '../../../domain/space.model';

@CommandHandler(CreateNewChannelCommand)
export class CreateNewChannelCommandHandler
  implements ICommandHandler<CreateNewChannelCommand> {
  constructor(private readonly spacesRepository: SpacesRepository) {}

  async execute(command: CreateNewChannelCommand) {
    const space = await this.spacesRepository.getById(command.spaceId);
    if (!space) {
      throw new NotFoundException(`no space exist with id ${command.spaceId}`);
    }
    const id = uuid.v4();
    const newChannel = {
      id,
      name: command.name,
    } as IChannelState;
    space.createNewChannel(newChannel);
    await this.spacesRepository.update(space);
  }
}
