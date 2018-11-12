import { any, boolean, object, string } from 'joi';

export interface IChatMessageDto {
  senderId: string;
  receiverId: string;
  body: string;
  timestamp: Date;
  isPrivate: boolean | true;
}

export const chatMessageSchema = object().keys({
  senderId: string().min(2),
  receiverId: string().min(2),
  body: string().min(2),
  timestamp: any(),
  isPrivate: boolean(),
}).required();
