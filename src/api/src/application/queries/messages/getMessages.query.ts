import { IQuery } from '@nestjs/cqrs';
import { IMessage } from 'api.contract';

export class GetMessagesQuery implements IQuery<IMessage[]> {
  constructor(
    public readonly receiverId: string,
    public readonly from: number,
    public readonly to: number,
  ) {}
}
