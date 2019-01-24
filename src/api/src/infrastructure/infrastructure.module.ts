import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SpaceSchema } from './schemas/space.schema';
import { ChannelSchema } from './schemas/channel.schema';
import { MessageSchema } from './schemas/message.schema';
import { MemberSchema } from './schemas/member.schema';
import { SpacesRepository } from './repositories/spaces.repository';
import { ChannelsRepository } from './repositories/channels.repository';
import { MessagesRepository } from './repositories/messages.repository';
import { MembersRepository } from './repositories/members.repository';
import { MembershipRepository } from './repositories/membership.repository';
import { ClientsService } from './clients.service';
import { MembershipSchema } from './schemas/membership.schema';

const schemas = [
  { name: 'Space', schema: SpaceSchema },
  { name: 'Channel', schema: ChannelSchema },
  { name: 'Message', schema: MessageSchema },
  { name: 'Member', schema: MemberSchema },
  { name: 'Membership', schema: MembershipSchema },
];

const repositories = [
  SpacesRepository,
  ChannelsRepository,
  MessagesRepository,
  MembersRepository,
  MembershipRepository,
];

@Module({
  imports: [MongooseModule.forFeature(schemas)],
  providers: [...repositories, ClientsService],
  exports: [...repositories, ClientsService],
})
export class InfrastructureModule {}
