import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from '../BaseRepository';
import { IMessageState, Message } from '../../domain/messages/message';

@Injectable()
export class MessagesRepository extends BaseRepository<Message> {
  constructor(@InjectModel('Message') dbSet: Model<IMessageState>) {
    super(dbSet, (s: IMessageState) => new Message(s));
  }
}
