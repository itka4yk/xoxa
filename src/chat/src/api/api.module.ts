import { Module } from '@nestjs/common';
import { ApplicationModule } from '../application/application.module';

import { SpacesController } from './controllers/spaces.controller';
import { ChannelsController } from './controllers/channels.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [ApplicationModule, AuthModule],
  controllers: [SpacesController, ChannelsController],
})
export class ApiModule { }
