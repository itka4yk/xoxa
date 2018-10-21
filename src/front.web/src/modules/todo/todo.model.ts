import { observable } from 'mobx';
import { v4 as getNewUuid } from 'uuid';

export interface ITodoModel {
  id: string;
  body: string;
  completed: boolean;
}

export class TodoModel implements ITodoModel {
  @observable
  body: string = '';
  @observable
  completed: boolean = false;
  @observable
  readonly id: string = getNewUuid();

  constructor(body: string) {
    this.body = body;
  }
}
