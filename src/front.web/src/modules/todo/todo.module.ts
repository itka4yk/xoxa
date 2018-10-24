import { ContainerModule, interfaces } from 'inversify';
import { TodoStore, ITodoStore, TodoStoreType } from './todo.store';

export const todoModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<ITodoStore>(TodoStoreType)
    .to(TodoStore)
    .inSingletonScope();
});

export { ITodoStore, TodoStoreType } from './todo.store';
export { ITodoModel } from './todo.model';
