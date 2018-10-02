import 'reflect-metadata';
import { Injectable, Type } from '@nestjs/common';
import {
  ObservableBus,
  InvalidModuleRefException,
} from '@nestjs/cqrs';

export type QueryHandlerMetatype = Type<IQueryHandler<IQuery<IQueryResult>, IQueryResult>>;

export interface IQueryResult {}

export const QueryHandler = (query: IQuery<IQueryResult>): ClassDecorator => {
  return (target: object) => {
    Reflect.defineMetadata('__queryHandler__', query, target);
  };
};

export interface IQueryHandler<T extends IQuery<TResult>, TResult extends IQueryResult> {
  execute(query: T, resolve: (value?) => void): TResult;
}

export interface IQuery<TResult extends IQueryResult> {
}

export interface IQueryBus {
  execute<T extends IQuery<TResult>, TResult extends IQueryResult>(query: T): Promise<TResult>;
}

export class QueryHandlerNotFoundException {
}

export class InvalidQueryHandlerException extends Error {
}

@Injectable()
export class QueryBus extends ObservableBus<IQuery<IQueryResult>> implements IQueryBus {

  private handlers = new Map<string, IQueryHandler<IQuery<IQueryResult>, IQueryResult>>();
  private moduleRef = null;

  setModuleRef(moduleRef) {
    this.moduleRef = moduleRef;
  }

  async execute<T extends IQuery<TResult>, TResult extends IQueryResult>(query: T): Promise<TResult> {
    const handler = this.handlers.get(this.getQueryName(query));
    if (!handler) throw new QueryHandlerNotFoundException();

    this.subject$.next(query);
    const result = await handler.execute(query, undefined) ;
    return result as TResult;
  }

  bind<T extends IQuery<TResult>, TResult>(handler: IQueryHandler<T, TResult>, name: string) {
    this.handlers.set(name, handler);
  }

  register(handlers: QueryHandlerMetatype[]) {
    handlers.forEach(handler => this.registerHandler(handler));
  }

  protected registerHandler(handler: QueryHandlerMetatype) {
    if (!this.moduleRef) {
      throw new InvalidModuleRefException();
    }
    const instance = this.moduleRef.get(handler);
    if (!instance) return;

    const target = this.reflectQueryName(handler);
    if (!target) {
      throw new InvalidQueryHandlerException();
    }
    this.bind(instance as IQueryHandler<IQuery<IQueryResult>, IQueryResult>, target.name);
  }

  private getQueryName(query): string {
    const { constructor } = Object.getPrototypeOf(query);
    return constructor.name as string;
  }

  private reflectQueryName(
    handler: QueryHandlerMetatype,
  ): FunctionConstructor {
    return Reflect.getMetadata('__queryHandler__', handler);
  }
}
