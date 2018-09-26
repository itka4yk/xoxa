import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { DomainModule } from './domain/domain.module';
import { ApplicationModule } from './application/application.module';
import { MongooseModule } from '@nestjs/mongoose';

const dbUrl = process.env.DBNAME || 'localhost';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${dbUrl}/xoxa`),
    ApiModule,
    InfrastructureModule,
    DomainModule,
    ApplicationModule,
  ],
})
export class AppModule { }
