import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SpacesRepository } from 'infrastructure/repositories/spaces.repository';
import { IChannel } from 'api.contract';
import { GetChannelsQuery } from 'application/queries/channels/getChannels.query';
import { ChannelsRepository } from 'infrastructure/repositories/channels.repository';
import { InvalidArgumentException } from 'shared/exceptions/InvalidArgument.exception';

@QueryHandler(GetChannelsQuery)
export class GetChannelsQueryHandler
  implements IQueryHandler<GetChannelsQuery, IChannel[]> {
  constructor(
    private readonly channelsRepository: ChannelsRepository,
    private readonly spacesRepository: SpacesRepository,
  ) {}

  async execute(query: GetChannelsQuery): Promise<IChannel[]> {
    const space = await this.spacesRepository.getById(query.spaceId);
    if (!space) throw new InvalidArgumentException('Unknown spaceId');

    if (!space.state.members.includes(query.memberId)) {
      throw new InvalidArgumentException('Unauthorized access to space');
    }

    const channels = await this.channelsRepository.get();
    return channels
      .filter(c => c.state.spaceId === query.spaceId)
      .map(
        c =>
          ({
            name: c.state.name,
            id: c.state.id,
          } as IChannel),
      );
  }
}
