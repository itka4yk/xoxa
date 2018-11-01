import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from '../BaseRepository';
import { IChannelState, Channel } from '../../domain/channels/channel';

@Injectable()
export class ChannelsRepository extends BaseRepository<Channel> {
  constructor(@InjectModel('Channel') dbSet: Model<IChannelState>) {
    super(dbSet, (s: IChannelState) => new Channel(s));
  }
}