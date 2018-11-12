import { IQuery } from '@nestjs/cqrs';
import { IChannel } from 'api.contract';

export class GetChannelsQuery implements IQuery<IChannel[]> {
  memberId: string;
  spaceId: string;
}
