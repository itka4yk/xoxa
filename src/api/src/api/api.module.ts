import { Module } from '@nestjs/common';
import { ApplicationModule } from '../application/application.module';
import { SpacesController } from './controllers/spaces.controller';
import { ChannelsController } from './controllers/channels.controller';
import { AuthModule } from '../auth/auth.module';
import { AuthController } from './controllers/auth.controller';


@Module({
  imports: [ApplicationModule, AuthModule],
  controllers: [SpacesController, ChannelsController, AuthController],
})
export class ApiModule { }
