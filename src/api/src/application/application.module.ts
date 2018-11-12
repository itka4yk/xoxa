import { Module } from '@nestjs/common';
import { EventBus, QueryBus } from '@nestjs/cqrs';
import { ModuleRef } from '@nestjs/core';
import { CommandHandlers } from './commandHandlers';
import { EventHandlers } from './eventHandlers';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { CommandBus } from './CommandBus';
import { SampleQueryHandler } from './queryHandlers/sample.queryHandler';
import { GetSpacesByMemberQueryHandler } from './queryHandlers/spaces/getSpacesByMember.queryHandler';
import { GetChannelsQueryHandler } from './queryHandlers/channels/getChannels.queryHandler';

const QueryHandlers = [
  SampleQueryHandler,
  GetSpacesByMemberQueryHandler,
  GetChannelsQueryHandler,
];

@Module({
  imports: [InfrastructureModule],
  providers: [QueryBus, CommandBus, EventBus, ...CommandHandlers, ...EventHandlers, ...QueryHandlers],
  exports: [QueryBus, CommandBus, EventBus],
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
