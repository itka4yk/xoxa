import { CreateNewSpaceCommandHandler } from './spaces/createNewSpace.commandHandler';
import { CreateNewChannelCommandHandler } from './channels/createNewChannel.commandHandler';
import { AssignNewUserCommandHandler } from './spaces/assignNewUser.commandHandler';
import { CreateMemberCommandHandler } from './members/createMember.commandHandler';
import { RenameMemberCommandHandler } from './members/renameMember.commandHandler';
import { InviteNewUserCommandHandler } from './spaces/inviteNewUser.commandHandler';

export const CommandHandlers = [
  CreateNewSpaceCommandHandler,
  CreateNewChannelCommandHandler,
  AssignNewUserCommandHandler,
  CreateMemberCommandHandler,
  RenameMemberCommandHandler,
  InviteNewUserCommandHandler,
];
