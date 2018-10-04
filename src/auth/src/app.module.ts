import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'users.service';
import { User } from './entity/user.entity';
import { HashService } from './hash.service';
import { Role } from 'entity/role.entity';
import { InitialSeedService } from './db/initialSeed.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([
      User,
      Role,
    ])
  ],
  providers: [UserService, HashService, InitialSeedService],
  controllers: [AuthController],
})
export class AppModule {}
