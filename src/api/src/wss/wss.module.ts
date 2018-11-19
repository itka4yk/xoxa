import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { ApplicationModule } from '../application/application.module';
import { ClientsService } from '../infrastructure/clients.service';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [ApplicationModule, InfrastructureModule, AuthModule],
  providers: [SocketService, ClientsService],
})
export class WssModule {}
