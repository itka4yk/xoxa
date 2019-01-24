import { IEvent } from '@nestjs/cqrs';

interface IState {
  userId: string;
  spaceId: string;
}

export class MemberCreatedEvent implements IEvent, IState {
  spaceId: string;
  userId: string;

  constructor(state: IState) {
    this.userId = state.userId;
    this.spaceId = state.spaceId;
  }
}
