import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from '../BaseRepository';
import {
  IMembershipState,
  MembershipModel,
} from '../../domain/membership.model';

@Injectable()
export class MembershipRepository extends BaseRepository<MembershipModel> {
  constructor(
    @InjectModel('Membership') readonly dbSet: Model<IMembershipState>,
  ) {
    super(dbSet, (s: IMembershipState) => new MembershipModel(s));
  }
}
