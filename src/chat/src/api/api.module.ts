import { Module } from '@nestjs/common';
import { ApplicationModule } from '../application/application.module';

import { SpacesController } from './controllers/spaces.controller';
import { ChannelsController } from './controllers/channels.controller';

@Module({
  imports: [ApplicationModule],
  controllers: [SpacesController, ChannelsController],
})
export class ApiModule { }
