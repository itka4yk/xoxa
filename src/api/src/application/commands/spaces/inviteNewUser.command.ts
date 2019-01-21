import { ICommand } from '@nestjs/cqrs';
import { IInviteNewUserDto } from 'api.contract';

export class InviteNewUserCommand implements ICommand, IInviteNewUserDto {
  spaceId: string;
  userEmail: string;
  applierId: string;
}
