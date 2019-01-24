import { ReceivedMessageEventHandler } from './receiveMessage.eventHandler';
import { SpaceCreatedEventHandler } from './spaceCreated.eventHandler';
import { MemberCreatedEventHandler } from './memberCreated.eventHandler';

export const EventHandlers = [
  ReceivedMessageEventHandler,
  SpaceCreatedEventHandler,
  MemberCreatedEventHandler,
];
