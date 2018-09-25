import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from 'domain/users/user.interface';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}

  async create(user: IUser): Promise<IUser> {
    const createdUser = new this.userModel(user);
    return await createdUser.save();
  }

  async findAll(): Promise<IUser[]> {
    return await this.userModel.find().exec();
  }
}