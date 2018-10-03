import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { BaseEntity } from '../domain/BaseEntity';
import { IDbEntityState } from './IDbEntityState';

@Injectable()
export abstract class BaseRepository<T extends BaseEntity<IDbEntityState>> {
  constructor(readonly dbSet: Model<any>, readonly getEntity: (state: IDbEntityState) => T) { }

  async create(state: IDbEntityState) {
    const st = await this.dbSet.create(state);
    return this.getEntity(st);
  }

  async get(): Promise<T[]> {
    return await this.dbSet.find().exec();
  }

  async getById(id: string): Promise<T> {
    const st = await this.dbSet.findOne({ id });
    return this.getEntity(st);
  }

  async delete({ id }) {
    await this.dbSet.deleteOne({ id });
  }

  async update(newState: IDbEntityState) {
    await this.dbSet.updateOne({ id: newState.id }, newState);
  }
}
