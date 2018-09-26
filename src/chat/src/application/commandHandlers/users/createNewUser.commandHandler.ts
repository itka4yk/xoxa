import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateNewUserCommand } from '../../commands/users/createNewUser.command';
import { UsersRepository } from '../../../infrastructure/repositories/users.repository';

@CommandHandler(CreateNewUserCommand)
export class CreateNewUserCommandHandler implements ICommandHandler<CreateNewUserCommand> {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(command: CreateNewUserCommand, resolve: (value?) => void) {
    this.usersRepository.create({ ...command } as any);
    resolve();
  }
}