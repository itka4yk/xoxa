import { Controller, Post, Body } from '@nestjs/common';

import { CreateNewChannelCommand } from '../../application/commands/channels/createNewChannel.command';
import { CommandBus } from '../../application/CommandBus';

@Controller('channels')
export class ChannelsController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async createNewChannel(@Body() commandDto: CreateNewChannelCommand ) {
    const command = new CreateNewChannelCommand();
    Object.assign(command, commandDto);
    await this.commandBus.execute(command);
  }
}
