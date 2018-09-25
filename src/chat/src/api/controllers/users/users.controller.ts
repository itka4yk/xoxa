import { Controller, Post, Body } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateNewUserCommand } from 'application/commands/users/createNewUser.command';

@Controller('users')
export class UsersController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async createNewUser(@Body() commandDto: CreateNewUserCommand ) {
    const command = new CreateNewUserCommand();
    Object.assign(commandDto, command);
    return await this.commandBus.execute(command);
  }
}
