import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from 'auth/auth.service';
import { credentialsSchema, newUserDtoSchema } from 'auth.contract';
import { HttpValidationPipe } from 'shared/pipes/httpValidation.pipe';
import { AuthGuard } from 'api/guards/auth.guard';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('authenticate')
  @UsePipes(new HttpValidationPipe(credentialsSchema))
  async authenticate(@Body() credentials) {
    return await this.authService.authenticate(credentials);
  }

  @Post('register')
  @UsePipes(new HttpValidationPipe(newUserDtoSchema))
  async register(@Body() newUserDto) {
    await this.authService.register(newUserDto);
  }

  @Post('activate')
  async activate(@Query() { id }) {
    await this.authService.activate(id);
  }

  @UseGuards(AuthGuard)
  @Get('userInfo')
  async getUserInfo(@Req() { userInfo }) {
    return userInfo;
  }
}
