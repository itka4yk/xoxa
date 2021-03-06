import { BaseEntity } from '../BaseEntity';
import { IDbEntityState } from 'infrastructure/IDbEntityState';
import { InvalidArgumentException } from '../../shared/exceptions/InvalidArgument.exception';

export interface IMemberState extends IDbEntityState {
  userId: string;
  name: string;
  spaceId: string;
  id: string;
}

export class Member extends BaseEntity<IMemberState> {
  rename(newName: string) {
    if (!newName) throw new InvalidArgumentException("New name can' be empty");
    if (newName === this.state.name) {
      throw new InvalidArgumentException("Name can't be the same");
    }
    this.state.name = newName;
  }
}
