import { observable, action, computed } from 'mobx';
import { ITodoModel } from './todo.module';
import { TodoModel } from './todo.model';
import { injectable, inject } from 'inversify';
import {
  persistable,
  NotificationsStoreType,
  INotificationsStore,
  INotification,
  NotificationType,
} from 'front.core';

export const TodoStoreType = Symbol('TODO_STORE');

export interface ITodoStore {
  todos: ITodoModel[];
  todoCount: number;
  completedTodoCount: number;
  addTodo(todo: string): void;
  toggleTodoStatus(todoId: string): void;
}

@persistable()
@injectable()
export class TodoStore implements ITodoStore {
  @observable
  todos: ITodoModel[] = [];

  @action
  addTodo(newTodo: string): void {
    this.todos.push(new TodoModel(newTodo));
    this.notifications.push({
      body: 'Added new todo!',
      type: NotificationType.INFO,
    } as INotification);
  }

  @inject(NotificationsStoreType)
  notifications!: INotificationsStore;

  @action
  toggleTodoStatus(todoId: string): void {
    const todo = this.todos.find(t => t.id === todoId);
    if (!todo) return;
    todo.completed = !todo.completed;
    this.notifications.push({
      body: 'Toggled todo status!',
      type: NotificationType.SUCCESS,
    } as INotification);
  }

  @computed
  get todoCount(): number {
    return this.todos.length;
  }

  @computed
  get completedTodoCount(): number {
    return this.todos.filter(t => t.completed).length;
  }
}
