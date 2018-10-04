import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { Role } from '../entity/role.entity';
import { HashService } from 'hash.service';
import uuid from 'uuid';

export class InitialSeedService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
    private readonly hashService: HashService,
  ) {
    this.seed();
  }

  readonly roles = [
    { id: 1, name: 'admin' },
    { id: 2, name: 'user' },
  ];

  async seed() {
    const usersCount = await this.userRepository.count();
    const rolesCount = await this.rolesRepository.count();

    if (!rolesCount) await this.seedRoles();
    if (!usersCount) await this.seedUsers();
  }

  async seedUsers() {
    const admin = new User();
    admin.id = uuid.v4();
    admin.email = 'admin@xoxa.app';
    admin.passwordHash = await this.hashService.create('password');
    const adminRole = await this.rolesRepository.findOne('1');
    admin.roles = [adminRole];
    await this.userRepository.save(admin);
  }

  async seedRoles() {
    await this.roles.forEach(async r => await this.rolesRepository.save(r));
  }
}