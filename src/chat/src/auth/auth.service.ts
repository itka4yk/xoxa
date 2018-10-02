import { Injectable, NotImplementedException } from '@nestjs/common';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(token: string): Promise<any> {
    throw new NotImplementedException('validateUser');
  }
  async signin(username: string, password: string): Promise<string> {
    return 'token';
  }
  async signup(token: string): Promise<any> {
    throw new NotImplementedException('signup');
  }
  async signout(token: string): Promise<any> {
    throw new NotImplementedException('signout');
  }
}