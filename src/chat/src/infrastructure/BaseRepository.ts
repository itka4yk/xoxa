import { Document, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { BaseEntity, IEntityState } from 'domain/BaseEntity';

@Injectable()
export abstract class BaseRepository<T extends BaseEntity<IEntityState>> {
  constructor(readonly dbSet: Model<any>, readonly getEntity: (state: IEntityState) => T) { }

  async create(state: IEntityState) {
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

  async update(newState: IEntityState) {
    await this.dbSet.updateOne({ id: newState.id }, newState);
  }
}
