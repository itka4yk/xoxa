import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SpaceCreatedEvent } from '../events/spaceCreated.event';
import { MembershipRepository } from '../../infrastructure/repositories/membership.repository';
import {
  IMembershipState,
  MembershipModel,
} from '../../domain/membership.model';
import { MemberCreatedEvent } from '../events/memberCreated.event';

@EventsHandler(MemberCreatedEvent)
export class MemberCreatedEventHandler
  implements IEventHandler<MemberCreatedEvent> {
  constructor(private readonly membershipRepository: MembershipRepository) {}

  async handle(event: SpaceCreatedEvent) {
    const membershipState = await this.membershipRepository.dbSet
      .findOne({ userId: event.userId })
      .exec();
    if (!membershipState) {
      const newMembership = new MembershipModel({
        userId: event.userId,
        spaces: [],
      } as IMembershipState);
      newMembership.assignToSpace(event.spaceId);
      await this.membershipRepository.create(newMembership.state);
    } else {
      const membership = new MembershipModel(membershipState);
      membership.assignToSpace(event.spaceId);
      await this.membershipRepository.update(membership);
    }
  }
}
