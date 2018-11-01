import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import uuid from 'uuid';

import { CreateNewChannelCommand } from '../../commands/channels/createNewChannel.command';
import { ChannelsRepository } from '../../../infrastructure/repositories/channels.repository';
import { SpacesRepository } from '../../../infrastructure/repositories/spaces.repository';

@CommandHandler(CreateNewChannelCommand)
export class CreateNewChannelCommandHandler implements ICommandHandler<CreateNewChannelCommand> {
  constructor(
    private readonly channelsRepository: ChannelsRepository,
    private readonly spacesRepository: SpacesRepository,
  ) {}

  async execute(command: CreateNewChannelCommand) {
    const space = await this.spacesRepository.getById(command.spaceId);
    if (!space) throw new NotFoundException(`no space exist with id ${command.spaceId}`);
    await this.channelsRepository.create({ ...command, id: uuid.v4() } as any);
  }
}