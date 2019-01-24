import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AssignNewUserCommand } from 'application/commands/spaces/assignNewUser.command';

@CommandHandler(AssignNewUserCommand)
export class AssignNewUserCommandHandler
  implements ICommandHandler<AssignNewUserCommand> {
  // constructor(private readonly spacesRepository: SpacesRepository) {}

  async execute(command: AssignNewUserCommand) {
    // const space = await this.spacesRepository.getById(command.spaceId);
    // if (!space) {
    //   throw new InvalidArgumentException(
    //     `Space with ${command.spaceId} doesn't exist.`,
    //   );
    // }
    // if (space.state.admin !== command.applierId) {
    //   throw new InvalidArgumentException(
    //     "User doesn't have authority to assign new users.",
    //   );
    // }
    // space.addNewMember(command.userId);
    // await this.spacesRepository.update(space);
  }
}
