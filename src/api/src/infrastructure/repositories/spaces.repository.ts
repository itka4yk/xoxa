import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from '../BaseRepository';
import { SpaceModel, ISpaceState } from '../../domain/space.model';

@Injectable()
export class SpacesRepository extends BaseRepository<SpaceModel> {
  constructor(@InjectModel('Space') readonly dbSet: Model<ISpaceState>) {
    super(dbSet, (s: ISpaceState) => new SpaceModel(s));
  }
}
