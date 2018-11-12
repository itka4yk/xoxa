import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from '../BaseRepository';
import { IMemberState, Member } from '../../domain/members/member';

@Injectable()
export class MembersRepository extends BaseRepository<Member> {
  constructor(@InjectModel('Member') dbSet: Model<IMemberState>) {
    super(dbSet, (s: IMemberState) => new Member(s));
  }
}
