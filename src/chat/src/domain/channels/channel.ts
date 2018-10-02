import { BaseEntity, IEntityState } from '../BaseEntity';

export interface IChannelState extends IEntityState {
  id: string;
  name: string;
  spaceId: string;
}

export class Channel extends BaseEntity<IChannelState> {
  changeName(newName: string) {
    this.state.name = newName;
  }
}