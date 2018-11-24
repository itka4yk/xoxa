import { IChannel } from '../channels/channel.interface';
import { IMemberInfo } from '../members/memberInfo.interface';

interface ISpace {
  spaceId: string;
  name: string;
  members: IMemberInfo[];
  channels: IChannel[];
}

export interface IAllSpaces {
  spaces: ISpace[];
}
