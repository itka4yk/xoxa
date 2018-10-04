import { Controller, Post, Get, Put, Delete, Body } from '@nestjs/common';
import { UserService } from 'users.service';
import { RegisterUserDto } from '../dto/registerUser.dto';
import { User } from 'entity/user.entity';
import { CredentialsDto } from 'dto/credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: UserService) {}

  @Post('login')
  async authenticate(@Body() credentials: CredentialsDto): Promise<string> {
    return await this.usersService.login(credentials);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterUserDto) {
    await this.usersService.create(registerDto);
  }

  @Get()
  async getAll() {

  }

  @Get()
  async getById() {

  }

  @Put()
  async update() {

  }

  @Delete()
  async delete() {

  }
}
