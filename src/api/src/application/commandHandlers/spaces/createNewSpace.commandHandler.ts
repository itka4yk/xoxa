import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateNewSpaceCommand } from '../../commands/spaces/createNewSpace.command';
import { SpacesRepository } from '../../../infrastructure/repositories/spaces.repository';
import uuid from 'uuid';
import { InvalidArgumentException } from 'shared/exceptions/InvalidArgument.exception';
import { Space } from 'domain/spaces/space';
import { MembersRepository } from '../../../infrastructure/repositories/members.repository';
import { Member } from '../../../domain/members/member';

@CommandHandler(CreateNewSpaceCommand)
export class CreateNewSpaceCommandHandler
  implements ICommandHandler<CreateNewSpaceCommand> {
  constructor(
    private readonly spacesRepository: SpacesRepository,
    private readonly membersRepository: MembersRepository,
  ) {}

  async execute(command: CreateNewSpaceCommand) {
    const space = await this.spacesRepository.dbSet.findOne({
      name: command.name,
    });
    if (space) {
      throw new InvalidArgumentException(
        `Space with name ${command.name} already exists!`,
      );
    }

    const spaceId: string = uuid.v4();

    const newSpace = new Space({
      ...command,
      id: spaceId,
      members: [command.adminId],
      channels: [],
      admin: command.adminId,
    } as any);

    await this.spacesRepository.create(newSpace.state);

    const memberId = uuid.v4();

    const member = new Member({
      spaceId,
      userId: command.adminId,
      name: command.adminName,
      id: memberId,
    } as any);
    await this.membersRepository.create(member.state);
  }
}
