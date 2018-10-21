import { Container } from 'inversify';
import { coreModules, initContainer } from 'front.core';
import { todoModule } from './modules/todo/todo.module';

const container = new Container();
container.load(todoModule, ...coreModules);

initContainer(container);

export { container };
