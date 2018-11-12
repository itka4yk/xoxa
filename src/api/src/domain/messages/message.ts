import { BaseEntity } from '../BaseEntity';
import { IDbEntityState } from 'infrastructure/IDbEntityState';
import { IChatMessageDto } from 'api.contract';

export interface IMessageState extends IDbEntityState, IChatMessageDto {
  id: string;
  name: string;
  spaceId: string;
}

export class Message extends BaseEntity<IMessageState> {}
