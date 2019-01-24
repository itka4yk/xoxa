import { BaseEntity } from './BaseEntity';
import { InvalidArgumentException } from 'shared/exceptions/InvalidArgument.exception';
import { IDbEntityState } from 'infrastructure/IDbEntityState';

export interface IMemberState {
  id: string;
  name: string;
  userId: string;
}
export interface IChannelState {
  id: string;
  name: string;
}

export interface ISpaceState extends IDbEntityState {
  id: string;
  name: string;
  members: IMemberState[];
  channels: IChannelState[];
  adminId: string;
}

export class SpaceModel extends BaseEntity<ISpaceState> {
  constructor(initialState: ISpaceState) {
    super(initialState);
  }

  setAdmin(adminId: string) {
    this.state.adminId = adminId;
  }

  rename(newName: string) {
    if (!newName) throw new InvalidArgumentException("New name can' be null");
    if (newName === this.state.name) {
      throw new InvalidArgumentException("Name can't be the same");
    }
    this.state.name = newName;
  }

  createNewChannel(newChannel: IChannelState) {
    if (!newChannel) {
      throw new InvalidArgumentException("Channel id can' be null");
    }
    if (this.state.channels.find(c => c.name === newChannel.name)) {
      throw new InvalidArgumentException('Channel with same name exists');
    }
    this.state.channels.push(newChannel);
  }

  removeChannel(channelId: string) {
    if (!channelId) {
      throw new InvalidArgumentException("Channel id can' be null.");
    }
    if (!this.state.channels.find(c => c.id === channelId)) {
      throw new InvalidArgumentException('Channel id not found');
    }
    this.state.channels = this.state.channels.filter(c => c.id !== channelId);
  }

  addNewMember(member: IMemberState) {
    if (!member) throw new InvalidArgumentException("Member id can' be null");
    this.state.members.push(member);
  }

  removeMember(memberId: string) {
    if (!memberId) {
      throw new InvalidArgumentException("Member id can' be null.");
    }
    if (!this.state.members.find(m => m.id === memberId)) {
      throw new InvalidArgumentException('Member id not found.');
    }
    this.state.members = this.state.members.filter(m => m.id !== memberId);
  }
}
