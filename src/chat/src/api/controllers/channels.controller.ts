import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';

import { CreateNewChannelCommand } from '../../application/commands/channels/createNewChannel.command';
import { CommandBus } from '../../application/CommandBus';
import { SampleQuery } from '../../application/queries/sample.query';
import { AuthGuard } from '../guards/auth.guard';
import { QueryBus } from '@nestjs/cqrs';

@Controller('channels')
export class ChannelsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  async createNewChannel(@Body() commandDto: CreateNewChannelCommand ) {
    const command = new CreateNewChannelCommand();
    Object.assign(command, commandDto);
    await this.commandBus.execute(command);
  }

  @Get()
  async getChannels() {
    return await this.queryBus.execute(new SampleQuery());
  }
}
