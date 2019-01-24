import { BaseEntity } from './BaseEntity';
import { InvalidArgumentException } from 'shared/exceptions/InvalidArgument.exception';
import { IDbEntityState } from 'infrastructure/IDbEntityState';

export interface IMembershipState extends IDbEntityState {
  userId: string;
  spaces: string[];
}

export class MembershipModel extends BaseEntity<IMembershipState> {
  constructor(initialState: IMembershipState) {
    super(initialState);
  }

  assignToSpace(spaceId: string) {
    if (!spaceId) {
      throw new InvalidArgumentException("Space id can' be null");
    }
    if (this.state.spaces.find(c => c === spaceId)) {
      throw new InvalidArgumentException(
        'User is already assigned to this space',
      );
    }
    this.state.spaces.push(spaceId);
  }

  unassignFromSpace(spaceId: string) {
    if (!spaceId) {
      throw new InvalidArgumentException("Space id can' be null.");
    }
    if (!this.state.spaces.find(c => c === spaceId)) {
      throw new InvalidArgumentException('Space id not found');
    }
    this.state.spaces = this.state.spaces.filter(c => c !== spaceId);
  }
}
