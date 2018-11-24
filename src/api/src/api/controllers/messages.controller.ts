import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
// tslint:disable-next-line:max-line-length
import { GetChannelMessagesQuery } from '../../application/queries/messages/getChannelMessages.query';
// tslint:disable-next-line:max-line-length
import { GetPrivateMessagesQuery } from '../../application/queries/messages/getPrivateMessages.query';
import { AuthGuard } from '../guards/auth.guard';

@Controller('api/messages')
@UseGuards(AuthGuard)
export class MessagesController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('channel')
  async getChannelMessages(@Query()
  {
    receiverId,
    from,
    to,
  }: GetChannelMessagesQuery) {
    const query = new GetChannelMessagesQuery(receiverId, +from, +to);
    return await this.queryBus.execute(query);
  }

  @Get('private')
  async getPrivateMessages(@Query()
  {
    secondId,
    firstId,
    from,
    to,
  }: GetPrivateMessagesQuery) {
    const query = new GetPrivateMessagesQuery(firstId, secondId, +from, +to);
    return await this.queryBus.execute(query);
  }
}
