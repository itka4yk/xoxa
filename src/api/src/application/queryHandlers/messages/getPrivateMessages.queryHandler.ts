import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IMessage } from 'api.contract';
import { MessagesRepository } from '../../../infrastructure/repositories/messages.repository';
import { GetPrivateMessagesQuery } from '../../queries/messages/getPrivateMessages.query';

@QueryHandler(GetPrivateMessagesQuery)
export class GetPrivateMessagesQueryHandler
  implements IQueryHandler<GetPrivateMessagesQuery, IMessage[]> {
  constructor(private readonly messagesRepository: MessagesRepository) {}

  async execute(query: GetPrivateMessagesQuery): Promise<IMessage[]> {
    return await this.messagesRepository.dbSet
      .find()
      .or([
        {
          receiverId: query.firstId,
          senderId: query.secondId,
        },
        {
          receiverId: query.secondId,
          senderId: query.firstId,
        },
      ])
      .sort('-timestamp')
      .skip(query.from)
      .limit(query.to);
  }
}
