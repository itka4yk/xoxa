import { Module } from '@nestjs/common';
import { CQRSModule, CommandBus } from '@nestjs/cqrs';
import { ModuleRef } from '@nestjs/core';
import { CommandHandlers } from '../application/commandHandlers';
import { InfrastructureModule } from 'infrastructure/infrastructure.module';

@Module({
  imports: [CQRSModule, InfrastructureModule],
  providers: [...CommandHandlers],
})
export class ApplicationModule {
  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly command$: CommandBus,
  ) {}

  onModuleInit() {
    this.command$.setModuleRef(this.moduleRef);

    this.command$.register(CommandHandlers);
  }
}
