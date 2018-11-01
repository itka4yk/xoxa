import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { DomainModule } from './domain/domain.module';
import { ApplicationModule } from './application/application.module';
import { MongooseModule } from '@nestjs/mongoose';
import { WssModule } from './wss/wss.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${process.env.DBNAME || 'localhost'}/xoxa`),
    ApiModule,
    InfrastructureModule,
    DomainModule,
    ApplicationModule,
    WssModule,
    AuthModule,
  ],
})
export class AppModule { }
