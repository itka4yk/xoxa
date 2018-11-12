import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RenameMemberCommand } from '../../commands/members/renameMember.command';

@CommandHandler(RenameMemberCommand)
export class RenameMemberCommandHandler
  implements ICommandHandler<RenameMemberCommand> {
  constructor() {}

  async execute(command: RenameMemberCommand) {}
}
