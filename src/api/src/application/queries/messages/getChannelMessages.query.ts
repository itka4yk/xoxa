import { IQuery } from '@nestjs/cqrs';
import { IMessage } from 'api.contract';

export class GetChannelMessagesQuery implements IQuery<IMessage[]> {
  constructor(
    public readonly receiverId: string,
    public readonly spaceId: string,
    public readonly from: number,
    public readonly to: number,
  ) {}
}
