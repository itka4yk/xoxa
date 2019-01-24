import { IEvent } from '@nestjs/cqrs';
import { IChatMessageDto } from 'api.contract';

export class ReceivedMessageEvent implements IEvent, IChatMessageDto {
  body: string;
  isPrivate: boolean | true;
  receiverId: string;
  senderId: string;
  timestamp: Date;
  spaceId: string;

  constructor(dto: IChatMessageDto) {
    Object.assign(this, dto);
  }
}
