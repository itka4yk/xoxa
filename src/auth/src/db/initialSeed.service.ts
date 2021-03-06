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

  readonly roles = [{ id: 1, name: 'admin' }, { id: 2, name: 'user' }];

  async seed() {
    const usersCount = await this.userRepository.count();
    const rolesCount = await this.rolesRepository.count();

    if (!rolesCount) await this.seedRoles();
    if (!usersCount) {
      await this.seedAdmin();
      await this.seedUser();
    }
  }

  async seedAdmin() {
    const admin = new User();
    admin.id = uuid.v4();
    admin.email = 'admin@xoxa.app';
    admin.passwordHash = await this.hashService.create('password');
    admin.activated = true;
    const adminRole = await this.rolesRepository.findOne('1');
    admin.roles = [adminRole];
    await this.userRepository.save(admin);
  }

  async seedUser() {
    const user = new User();
    user.id = uuid.v4();
    user.email = 'user@xoxa.app';
    user.passwordHash = await this.hashService.create('password');
    user.activated = true;
    const userRole = await this.rolesRepository.findOne('2');
    user.roles = [userRole];
    await this.userRepository.save(user);
  }

  async seedRoles() {
    await this.roles.forEach(async r => await this.rolesRepository.save(r));
  }
}
