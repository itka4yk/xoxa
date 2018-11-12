import { Controller, UseFilters } from '@nestjs/common';
import { UserService } from 'users.service';
import { MessagePattern } from '@nestjs/microservices';
import { RpcFilter } from '../all-exception.filter';

@Controller('auth')
@UseFilters(new RpcFilter())
export class AuthController {
  constructor(private readonly usersService: UserService) {}

  @MessagePattern({ cmd: 'authenticate' })
  async authenticate(credentials): Promise<string> {
    return await this.usersService.login(credentials);
  }

  @MessagePattern({ cmd: 'register' })
  async register(registerDto) {
    await this.usersService.create(registerDto);
  }

  @MessagePattern({ cmd: 'verify' })
  verify(token: string): string {
    return this.usersService.validate(token) as any;
  }

  @MessagePattern({ cmd: 'activate' })
  activate(id: string) {
    return this.usersService.activate(id);
  }
  @MessagePattern({ cmd: 'userInfo' })
  getUserInfo(token: string) {
    return this.usersService.getUserInfo(token);
  }
}
