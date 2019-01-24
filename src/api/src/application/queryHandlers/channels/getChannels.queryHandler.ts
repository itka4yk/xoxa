import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SpacesRepository } from 'infrastructure/repositories/spaces.repository';
import { IChannel } from 'api.contract';
import { GetChannelsQuery } from 'application/queries/channels/getChannels.query';
import { InvalidArgumentException } from 'shared/exceptions/InvalidArgument.exception';

@QueryHandler(GetChannelsQuery)
export class GetChannelsQueryHandler
  implements IQueryHandler<GetChannelsQuery, IChannel[]> {
  constructor(private readonly spacesRepository: SpacesRepository) {}

  async execute(query: GetChannelsQuery): Promise<IChannel[]> {
    const space = await this.spacesRepository.dbSet
      .findOne({ id: query.spaceId })
      .exec();
    if (!space) throw new InvalidArgumentException('Unknown spaceId');

    if (!space.members.find(m => m.id === query.memberId)) {
      throw new InvalidArgumentException('Unauthorized access to space');
    }

    return space.channels;
  }
}
