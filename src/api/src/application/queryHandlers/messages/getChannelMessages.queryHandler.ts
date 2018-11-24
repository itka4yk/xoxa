import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetChannelMessagesQuery } from '../../queries/messages/getChannelMessages.query';
import { IMessage } from 'api.contract';
import { MessagesRepository } from '../../../infrastructure/repositories/messages.repository';

@QueryHandler(GetChannelMessagesQuery)
export class GetChannelMessagesQueryHandler
  implements IQueryHandler<GetChannelMessagesQuery, IMessage[]> {
  constructor(private readonly messagesRepository: MessagesRepository) {}

  async execute(query: GetChannelMessagesQuery): Promise<IMessage[]> {
    return await this.messagesRepository.dbSet
      .find({ receiverId: query.receiverId })
      .sort('-timestamp')
      .skip(query.from)
      .limit(query.to);
  }
}
