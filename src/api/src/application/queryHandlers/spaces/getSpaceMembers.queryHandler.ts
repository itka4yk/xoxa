import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetSpaceMembersQuery } from 'application/queries/spaces/getSpaceMembersQuery';
import { SpacesRepository } from 'infrastructure/repositories/spaces.repository';
import { ISpaceMember } from 'api.contract';
import { InvalidArgumentException } from '../../../shared/exceptions/InvalidArgument.exception';
import { MembersRepository } from '../../../infrastructure/repositories/members.repository';

@QueryHandler(GetSpaceMembersQuery)
export class GetSpaceMembersQueryHandler
  implements IQueryHandler<GetSpaceMembersQuery, ISpaceMember[]> {
  constructor(
    private readonly spacesRepository: SpacesRepository,
    private readonly membersRepository: MembersRepository,
  ) {}

  async execute(query: GetSpaceMembersQuery): Promise<ISpaceMember[]> {
    const space = await this.spacesRepository.getById(query.spaceId);
    if (!space) throw new InvalidArgumentException('Unknown spaceId');

    if (!space.state.members.includes(query.requesterId)) {
      throw new InvalidArgumentException('Unauthorized access to space');
    }
    const members = await this.membersRepository.get();
    return members
      .filter(c => c.state.spaceId === query.spaceId)
      .map(
        ({ state }) =>
          ({
            id: state.id,
            name: state.name,
            spaceId: state.spaceId,
            userId: state.userId,
          } as ISpaceMember),
      );
  }
}
