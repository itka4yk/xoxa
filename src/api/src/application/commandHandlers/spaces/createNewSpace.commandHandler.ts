import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateNewSpaceCommand } from '../../commands/spaces/createNewSpace.command';
import { SpacesRepository } from '../../../infrastructure/repositories/spaces.repository';
import uuid from 'uuid';
import { InvalidArgumentException } from 'shared/exceptions/InvalidArgument.exception';
import { ISpaceState } from 'domain/spaces/space';

@CommandHandler(CreateNewSpaceCommand)
export class CreateNewSpaceCommandHandler implements ICommandHandler<CreateNewSpaceCommand> {
  constructor(private readonly spacesRepository: SpacesRepository) {}

  async execute(command: CreateNewSpaceCommand) {
    const space = await this.spacesRepository.dbSet.findOne({ name: command.name });
    if (space) throw new InvalidArgumentException(`Space with name ${command.name} allready exists!`);
    await this.spacesRepository.create({
      ...command,
      id: uuid.v4(),
      members: [command.admin],
    } as ISpaceState);
  }
}