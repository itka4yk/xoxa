import { BaseEntity } from '../BaseEntity';
import { InvalidArgumentException } from '../../shared/exceptions/InvalidArgument.exception';
import { IDbEntityState } from 'infrastructure/IDbEntityState';

export interface IChannelState extends IDbEntityState {
  id: string;
  name: string;
  spaceId: string;
}

export class Channel extends BaseEntity<IChannelState> {
  rename(newName: string) {
    if (!newName) throw new InvalidArgumentException("New name can' be null");
    if (newName === this.state.name) {
      throw new InvalidArgumentException("Name can't be the same");
    }
    this.state.name = newName;
  }
}
