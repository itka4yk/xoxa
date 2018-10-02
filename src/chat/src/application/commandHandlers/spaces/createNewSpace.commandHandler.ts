import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateNewSpaceCommand } from '../../commands/spaces/createNewSpace.command';
import { SpacesRepository } from '../../../infrastructure/repositories/spaces.repository';
import uuid from 'uuid';

@CommandHandler(CreateNewSpaceCommand)
export class CreateNewSpaceCommandHandler implements ICommandHandler<CreateNewSpaceCommand> {
  constructor(private readonly spacesRepository: SpacesRepository) {}

  async execute(command: CreateNewSpaceCommand, resolve: (value?) => void) {
    await this.spacesRepository.create({ ...command, id: uuid.v4() } as any);
  }
}