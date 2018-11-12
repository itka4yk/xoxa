import { IsNotEmpty } from 'class-validator';
import { ICommand } from '@nestjs/cqrs';

export class CreateNewChannelCommand implements ICommand {
  @IsNotEmpty()
  spaceId: string;

  @IsNotEmpty()
  name: string;
}
