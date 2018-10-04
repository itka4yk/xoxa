import { IsNotEmpty, IsEmail } from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
}