import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import uuid from 'uuid';
import { decode, sign, verify } from 'jsonwebtoken';

import { User } from './entity/user.entity';
import { Role } from './entity/role.entity';
import { HashService } from './hash.service';
import { IUserInfo } from 'auth.contract';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly rolesRepository: Repository<Role>,
    private readonly hashService: HashService,
  ) {}

  async activate(id: string) {
    await this.userRepository.update({ id }, { activated: true });
  }

  async create(newUser): Promise<void> {
    if (await this.userRepository.findOne({ where: { email: newUser.email } })) {
      throw new Error(`User with email ${newUser.email} allready exists.`);
    }
    await this.userRepository.save({
      id: uuid.v4(),
      email: newUser.email,
      passwordHash: await this.hashService.create(newUser.password),
      roles: [await this.rolesRepository.findOne({ where: { name: 'user' } })],
      activated: false,
    });
  }

  async login(credentials): Promise<string> {
    const user = await this.userRepository.findOne({ where: { email: credentials.email } });
    if (!user || !(await this.hashService.compare(credentials.password, user.passwordHash))) {
      throw new Error('Invalid credentials');
    }
    const { id, email } = user;
    return sign({ id, email }, 'some_random_secret');
  }

  validate(token: string): Promise<IUserInfo> {
    return verify(token, 'some_random_secret') as any;
  }

  async getUserInfo(token: string): Promise<IUserInfo> {
    const { email: decodedEmail } = decode(token) as IUserInfo;
    const { id, email, roles } = await this.userRepository.findOne({
      where: { email: decodedEmail },
      relations: ['roles'],
    });
    return { id, email, roles: roles.map(r => r.name) } as IUserInfo;
  }
}
