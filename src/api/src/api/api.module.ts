import { Module } from '@nestjs/common';
import { ApplicationModule } from '../application/application.module';
import { SpacesController } from './controllers/spaces.controller';
import { ChannelsController } from './controllers/channels.controller';
import { AuthModule } from '../auth/auth.module';
import { AuthController } from './controllers/auth.controller';
import { MessagesController } from './controllers/messages.controller';
import { MembersController } from './controllers/members.controller';

@Module({
  imports: [ApplicationModule, AuthModule],
  controllers: [
    SpacesController,
    ChannelsController,
    AuthController,
    MessagesController,
    MembersController,
  ],
})
export class ApiModule {}
