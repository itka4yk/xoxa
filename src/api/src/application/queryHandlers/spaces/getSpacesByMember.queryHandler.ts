import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetSpacesByUserQuery } from 'application/queries/spaces/getSpacesByUserQuery';
import { SpacesRepository } from 'infrastructure/repositories/spaces.repository';
import { IMySpace } from 'api.contract';
import { MembershipRepository } from '../../../infrastructure/repositories/membership.repository';

@QueryHandler(GetSpacesByUserQuery)
export class GetSpacesByMemberQueryHandler
  implements IQueryHandler<GetSpacesByUserQuery, IMySpace[]> {
  constructor(
    private readonly spacesRepository: SpacesRepository,
    private readonly membershipRepository: MembershipRepository,
  ) {}

  async execute(query: GetSpacesByUserQuery): Promise<IMySpace[]> {
    const membership = await this.membershipRepository.dbSet
      .findOne({ userId: query.userId })
      .exec();
    if (!membership) return [];
    const spaces = await this.spacesRepository.dbSet
      .find({ id: membership.spaces })
      .exec();
    return spaces.map(s => ({
      id: s.id,
      name: s.name,
      adminId: s.adminId,
      channels: s.channels,
      members: s.members,
    }));
  }
}
