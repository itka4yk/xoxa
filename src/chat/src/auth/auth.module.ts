import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';

@Module({
  providers: [AuthService, UsersService],
  exports: [AuthService],
})
export class AuthModule {}
