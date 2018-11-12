import { ICommand } from '@nestjs/cqrs';
import { IAssignNewUserDto } from 'api.contract';

export class AssignNewUserCommand implements ICommand, IAssignNewUserDto {
  spaceId: string;
  userId: string;
  applierId: string;
}
