import { Document } from 'mongoose';

export interface IEntityState extends Document {}

export class BaseEntity<T extends IEntityState> {
  state: T;

  init = (state: T) => this.state = state;

  constructor(state?: T) {
    if (state) this.init(state);
  }

  update = () => this.state.save();
}