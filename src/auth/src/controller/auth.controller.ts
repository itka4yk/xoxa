import { Controller, Post, Get, Put, Delete, Body, UseGuards } from '@nestjs/common';
import { UserService } from 'users.service';
import { RegisterUserDto } from '../dto/registerUser.dto';
import { CredentialsDto } from 'dto/credentials.dto';
import { AuthGuard } from '../auth.guard';

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

  @UseGuards(AuthGuard)
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
