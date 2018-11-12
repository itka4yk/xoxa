import { BaseEntity } from '../BaseEntity';
import { InvalidArgumentException } from 'shared/exceptions/InvalidArgument.exception';
import { IDbEntityState } from 'infrastructure/IDbEntityState';

export interface ISpaceState extends IDbEntityState {
  id: string;
  name: string;
  members: string[];
  channels: string[];
  admin: string;
}

export class Space extends BaseEntity<ISpaceState> {
  setAdmin(adminId: string) {
    // TODO: fix admin\'s member creation
    this.state.admin = adminId;
  }

  rename(newName: string) {
    if (!newName) throw new InvalidArgumentException("New name can' be null");
    if (newName === this.state.name) {
      throw new InvalidArgumentException("Name can't be the same");
    }
    this.state.name = newName;
  }

  createNewChannel(channelId: string) {
    if (!channelId) {
      throw new InvalidArgumentException("Channel id can' be null");
    }
    this.state.channels.push(channelId);
  }

  removeChannel(channelId: string) {
    if (!channelId) {
      throw new InvalidArgumentException("Channel id can' be null.");
    }
    if (!this.state.channels.find(c => c === channelId)) {
      throw new InvalidArgumentException('Channel id not found');
    }
    this.state.channels = this.state.channels.filter(c => c !== channelId);
  }

  addNewMember(memberId: string) {
    if (!memberId) throw new InvalidArgumentException("Member id can' be null");
    this.state.members.push(memberId);
  }

  removeMember(memberId: string) {
    if (!memberId) {
      throw new InvalidArgumentException("Member id can' be null.");
    }
    if (!this.state.members.find(m => m === memberId)) {
      throw new InvalidArgumentException('Member id not found.');
    }
    this.state.members = this.state.members.filter(m => m !== memberId);
  }
}
