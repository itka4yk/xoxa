import { IsEmail, IsNotEmpty } from 'class-validator';
import { ICommand } from '@nestjs/cqrs';

export class CreateNewUserCommand implements ICommand {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}