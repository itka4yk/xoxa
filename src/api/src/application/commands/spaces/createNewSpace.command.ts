import { IsNotEmpty } from 'class-validator';
import { ICommand } from '@nestjs/cqrs';
import { ICreateNewSpaceDto } from 'api.contract';

export class CreateNewSpaceCommand implements ICommand, ICreateNewSpaceDto {
  @IsNotEmpty()
  name: string;
  admin: string;
}
