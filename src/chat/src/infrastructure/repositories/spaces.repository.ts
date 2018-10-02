import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from '../BaseRepository';
import { Space, ISpaceState } from '../../domain/spaces/space';

@Injectable()
export class SpacesRepository extends BaseRepository<Space> {
  constructor(@InjectModel('Space') readonly dbSet: Model<ISpaceState>) {
    super(dbSet, (s: ISpaceState) => new Space(s));
  }
}