import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { CQRSModule, CommandBus } from '@nestjs/cqrs';
import { ApplicationModule } from 'application/application.module';
import { ModuleRef } from '@nestjs/core';

import { CommandHandlers } from '../application/commandHandlers';

@Module({
  imports: [CQRSModule, ApplicationModule],
  controllers: [UsersController],
  // providers: [...CommandHandlers],
})
export class ApiModule {
  // constructor(
  //   private readonly moduleRef: ModuleRef,
  //   private readonly command$: CommandBus,
  // ) {}

  // onModuleInit() {
  //   this.command$.setModuleRef(this.moduleRef);

  //   this.command$.register(CommandHandlers);
  // }
}
