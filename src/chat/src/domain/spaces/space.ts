import { IEntityState, BaseEntity } from '../BaseEntity';

export interface ISpaceState extends IEntityState {
  readonly id: string;
  readonly name: string;
}

export class Space extends BaseEntity<ISpaceState> {
}
