import { IQuery } from '@nestjs/cqrs';
import { IMessage } from 'api.contract';

export class GetPrivateMessagesQuery implements IQuery<IMessage[]> {
  constructor(
    public readonly firstId: string,
    public readonly secondId,
    public readonly from: number,
    public readonly to: number,
  ) {}
}
