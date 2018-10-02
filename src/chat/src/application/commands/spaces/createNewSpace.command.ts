import { IsNotEmpty } from 'class-validator';
import { ICommand } from '@nestjs/cqrs';

export class CreateNewSpaceCommand implements ICommand {
  @IsNotEmpty()
  name: string;
}