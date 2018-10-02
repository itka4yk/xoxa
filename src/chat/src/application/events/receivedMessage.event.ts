import { IEvent } from '@nestjs/cqrs';

export class ReceivedMessageEvent implements IEvent {
  constructor(
    public readonly messageId: string,
    public readonly body: string) {}
}