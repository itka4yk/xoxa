import { Controller, Post, Body, Get, UseGuards, UsePipes, Req, Query } from '@nestjs/common';

import { CreateNewChannelCommand } from '../../application/commands/channels/createNewChannel.command';
import { CommandBus } from '../../application/CommandBus';
import { SampleQuery } from '../../application/queries/sample.query';
import { AuthGuard } from '../guards/auth.guard';
import { QueryBus } from '@nestjs/cqrs';
import { createNewChannelSchema } from 'api.contract/lib/dto/channels/createNewChannel.dto';
import { JoiValidationPipe } from 'joiValidation.pipe';
import { GetChannelsQuery } from 'application/queries/channels/getChannels.query';

@Controller('api/channels')
@UseGuards(AuthGuard)
export class ChannelsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @UsePipes(new JoiValidationPipe(createNewChannelSchema))
  async createNewChannel(@Body() commandDto ) {
    const command = new CreateNewChannelCommand();
    Object.assign(command, commandDto);
    await this.commandBus.execute(command);
  }

  @Get()
  async getChannels(@Req() { userInfo }, @Query() { spaceId } ) {
    const query = new GetChannelsQuery();
    query.memberId = userInfo.id;
    query.spaceId = spaceId;
    return await this.queryBus.execute(query);
  }
}
