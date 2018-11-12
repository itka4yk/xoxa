import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetMessagesQuery } from '../../queries/messages/getMessages.query';
import { IMessage } from 'api.contract';
import { MessagesRepository } from '../../../infrastructure/repositories/messages.repository';

@QueryHandler(GetMessagesQuery)
export class GetMessagesQueryHandler
  implements IQueryHandler<GetMessagesQuery, IMessage[]> {
  constructor(private readonly messagesRepository: MessagesRepository) {}

  async execute(query: GetMessagesQuery): Promise<IMessage[]> {
    return await this.messagesRepository.dbSet
      .find({ receiverId: query.receiverId })
      .skip(query.from)
      .limit(query.to);
  }
}
