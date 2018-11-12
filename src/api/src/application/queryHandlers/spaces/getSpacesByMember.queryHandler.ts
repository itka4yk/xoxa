import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetSpacesByMemberQuery } from 'application/queries/spaces/getSpacesByMember.query';
import { SpacesRepository } from 'infrastructure/repositories/spaces.repository';
import { IMySpace } from 'api.contract';

@QueryHandler(GetSpacesByMemberQuery)
export class GetSpacesByMemberQueryHandler implements IQueryHandler<GetSpacesByMemberQuery, IMySpace[]> {
  constructor(private readonly spacesRepository: SpacesRepository) {}

  async execute(query: GetSpacesByMemberQuery): Promise<IMySpace[]> {
    const spaces = await this.spacesRepository.get();
    return spaces.filter(s => s.state.members.includes(query.memberId)).map(s => ({
      id: s.state.id,
      name: s.state.name,
    } as IMySpace));
  }
}