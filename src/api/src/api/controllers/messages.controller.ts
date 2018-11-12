import { Controller, Get, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetMessagesQuery } from '../../application/queries/messages/getMessages.query';

@Controller('api/messages')
export class MessagesController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  async getMessages(@Query() { receiverId, from, to }: GetMessagesQuery) {
    const query = new GetMessagesQuery(receiverId, +from, +to);
    return await this.queryBus.execute(query);
  }
}
