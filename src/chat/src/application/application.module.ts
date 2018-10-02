import { Module } from '@nestjs/common';
import { CQRSModule, EventBus } from '@nestjs/cqrs';
import { ModuleRef } from '@nestjs/core';
import { CommandHandlers } from '../application/commandHandlers';
import { EventHandlers } from '../application/eventHandlers';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { CommandBus } from './CommandBus';
import { QueryBus } from './QueryBus';
import { SampleQueryHandler } from './queryHandlers/sample.queryHandler';

const QueryHandlers = [
  SampleQueryHandler,
];


@Module({
  imports: [CQRSModule, InfrastructureModule],
  providers: [...CommandHandlers, ...EventHandlers, ...QueryHandlers, QueryBus, CommandBus],
  exports: [CommandBus, QueryBus, CQRSModule],
})
export class ApplicationModule {
  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly commandBus$: CommandBus,
    private readonly queryBus$: QueryBus,
    private readonly eventBus$: EventBus,
  ) {}

  onModuleInit() {
    this.commandBus$.setModuleRef(this.moduleRef);
    this.eventBus$.setModuleRef(this.moduleRef);
    this.queryBus$.setModuleRef(this.moduleRef);

    this.commandBus$.register(CommandHandlers);
    this.eventBus$.register(EventHandlers);
    this.queryBus$.register(QueryHandlers);
  }
}
