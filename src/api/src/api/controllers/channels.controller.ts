import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  UsePipes,
  Req,
  Query,
} from '@nestjs/common';

// tslint:disable-next-line:max-line-length
import { CreateNewChannelCommand } from '../../application/commands/channels/createNewChannel.command';
import { CommandBus } from '../../application/CommandBus';
import { AuthGuard } from '../guards/auth.guard';
import { QueryBus } from '@nestjs/cqrs';
import { createNewChannelSchema } from 'api.contract/lib/dto/channels/createNewChannel.dto';
import { HttpValidationPipe } from 'shared/pipes/httpValidation.pipe';
import { GetChannelsQuery } from 'application/queries/channels/getChannels.query';

@Controller('api/channels')
@UseGuards(AuthGuard)
export class ChannelsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @UsePipes(new HttpValidationPipe(createNewChannelSchema))
  async createNewChannel(@Body() commandDto) {
    const command = new CreateNewChannelCommand();
    Object.assign(command, commandDto);
    await this.commandBus.execute(command);
  }

  @Get()
  async getChannels(@Req() { userInfo }, @Query() { spaceId }) {
    const query = new GetChannelsQuery();
    query.memberId = userInfo.id;
    query.spaceId = spaceId;
    return await this.queryBus.execute(query);
  }
}
