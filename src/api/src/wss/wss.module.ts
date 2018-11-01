import { Module } from '@nestjs/common';
import { EventsGateway } from './socket.service';
import { ApplicationModule } from '../application/application.module';
import { ClientsService } from './clients.service';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [ApplicationModule, InfrastructureModule, AuthModule],
  providers: [EventsGateway, ClientsService],
})
export class WssModule {}
