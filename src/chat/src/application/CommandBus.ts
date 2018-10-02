import 'reflect-metadata';
import { Injectable, Type } from '@nestjs/common';
import {
  ICommandHandler,
  ICommand,
  ObservableBus,
  ICommandBus,
  CommandHandlerNotFoundException,
  InvalidModuleRefException,
  InvalidCommandHandlerException,
} from '@nestjs/cqrs';

export type CommandHandlerMetatype = Type<ICommandHandler<ICommand>>;

@Injectable()
export class CommandBus extends ObservableBus<ICommand> implements ICommandBus {
  private handlers = new Map<string, ICommandHandler<ICommand>>();
  private moduleRef = null;

  setModuleRef(moduleRef) {
    this.moduleRef = moduleRef;
  }

  execute<T extends ICommand>(command: T): Promise<any> {
    const handler = this.handlers.get(this.getCommandName(command));
    if (!handler) {
      throw new CommandHandlerNotFoundException();
    }
    this.subject$.next(command);
    return handler.execute(command, undefined);
  }

  bind<T extends ICommand>(handler: ICommandHandler<T>, name: string) {
    this.handlers.set(name, handler);
  }

  register(handlers: CommandHandlerMetatype[]) {
    handlers.forEach(handler => this.registerHandler(handler));
  }

  protected registerHandler(handler: CommandHandlerMetatype) {
    if (!this.moduleRef) {
      throw new InvalidModuleRefException();
    }
    const instance = this.moduleRef.get(handler);
    if (!instance) return;

    const target = this.reflectCommandName(handler);
    if (!target) {
      throw new InvalidCommandHandlerException();
    }
    this.bind(instance as ICommandHandler<ICommand>, target.name);
  }

  private getCommandName(command): string {
    const { constructor } = Object.getPrototypeOf(command);
    return constructor.name as string;
  }

  private reflectCommandName(
    handler: CommandHandlerMetatype,
  ): FunctionConstructor {
    return Reflect.getMetadata('__commandHandler__', handler);
  }
}
