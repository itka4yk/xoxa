import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheService } from './cache.service';
import { SpaceSchema } from './schemas/space.schema';
import { ChannelSchema } from './schemas/channel.schema';
import { MessageSchema } from './schemas/message.schema';
import { SpacesRepository } from './repositories/spaces.repository';
import { ChannelsRepository } from './repositories/channels.repository';
import { MessagesRepository } from './repositories/messages.repository';

const schemas = [
  { name: 'Space', schema: SpaceSchema },
  { name: 'Channel', schema: ChannelSchema },
  { name: 'Message', schema: MessageSchema },
];

const repositories = [
  SpacesRepository,
  ChannelsRepository,
  MessagesRepository,
];

@Module({
  imports: [MongooseModule.forFeature(schemas)],
  providers: [...repositories, CacheService],
  exports: [...repositories, CacheService],
})
export class InfrastructureModule {}
