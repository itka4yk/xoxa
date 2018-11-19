import { IQuery } from '@nestjs/cqrs';
import { ISpaceMember } from 'api.contract';

export class GetSpaceMembersQuery implements IQuery<ISpaceMember> {
  constructor(public spaceId: string, public requesterId: string) {}
}
