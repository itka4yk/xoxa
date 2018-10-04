import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { RegisterUserDto } from 'dto/registerUser.dto';
import { HashService } from 'hash.service';
import uuid from 'uuid';
import { CredentialsDto } from 'dto/credentials.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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
    });
  }

  async login(credentials: CredentialsDto): Promise<string> {
    const user = await this.userRepository.findOne({ where: { email: credentials.email } });
    if (!user || !await this.hashService.compare(credentials.password, user.passwordHash)) {
      throw new Error('Invalid credentials');
    }
    // TODO: add token generator
    return 'ok';
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }
}