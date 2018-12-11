import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IAllSpaces } from 'api.contract';
import { GetAllSpacesQuery } from '../../queries/spaces/getAllSpacesQuery';
import { SpacesRepository } from '../../../infrastructure/repositories/spaces.repository';
import { MembersRepository } from '../../../infrastructure/repositories/members.repository';
import { ChannelsRepository } from '../../../infrastructure/repositories/channels.repository';

@QueryHandler(GetAllSpacesQuery)
export class GetAllSpacesQueryHandler
  implements IQueryHandler<GetAllSpacesQuery, IAllSpaces> {
  constructor(
    private readonly spacesRepository: SpacesRepository,
    private readonly membersRepository: MembersRepository,
    private readonly channelsRepository: ChannelsRepository,
  ) {}

  async execute(query: GetAllSpacesQuery): Promise<IAllSpaces> {
    const spaces = await this.spacesRepository.get();
    const channels = await this.channelsRepository.get();
    const members = await this.membersRepository.get();
    console.log('EHRE');
    return {
      spaces: spaces
        .filter(s => s.state.members.includes(query.userId))
        .map(({ state }) => ({
          spaceId: state.id,
          name: state.name,
          channels: channels
            .filter(c => c.state.spaceId === state.id)
            .map(({ state: { spaceId, name, id } }) => ({ spaceId, name, id })),
          members: members
            .filter(c => c.state.spaceId === state.id)
            .map(({ state: { spaceId, name, id, userId } }) => ({
              spaceId,
              name,
              id,
              userId,
            })),
        })),
    };
  }
}
