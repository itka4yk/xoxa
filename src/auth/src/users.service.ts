import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import uuid from 'uuid';
import { sign, verify } from 'jsonwebtoken';

import { User } from './entity/user.entity';
import { RegisterUserDto } from './dto/registerUser.dto';
import { CredentialsDto } from './dto/credentials.dto';
import { Role } from './entity/role.entity';
import { HashService } from './hash.service';
import { IUserInfo } from './interfaces/userInfo.interface';

// FIXME: move secret to config

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly rolesRepository: Repository<Role>,
    private readonly hashService: HashService,
  ) {}

  async create(newUser: RegisterUserDto): Promise<void> {
    if (await this.userRepository.findOne({ where: { email: newUser.email } })) {
      throw new Error(`User with email ${newUser.email} allready exists.`);
    }
    await this.userRepository.save({
      id: uuid.v4(),
      email: newUser.email,
      passwordHash: await this.hashService.create(newUser.password),
      roles: [await this.rolesRepository.findOne({ where: { name: 'user' }})],
    });
  }

  async login(credentials: CredentialsDto): Promise<string> {
    const user = await this.userRepository.findOne({ where: { email: credentials.email } });
    if (!user || !await this.hashService.compare(credentials.password, user.passwordHash)) {
      throw new Error('Invalid credentials');
    }
    return sign(await this.getUserInfo(user.email), 'some_random_secret');
  }

  validate(token: string): Promise<IUserInfo> {
    return verify(token, 'some_random_secret') as any;
  }

  async getUserInfo(userEmail: string): Promise<IUserInfo> {
    const { id, email, roles } = await this.userRepository.findOne({ where: { email: userEmail }, relations: ['roles'] });
    return { id, email, roles: roles.map(r => r.name) } as IUserInfo;
  }
}