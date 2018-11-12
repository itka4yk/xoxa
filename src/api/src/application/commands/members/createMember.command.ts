import { ICommand } from '@nestjs/cqrs';

export class CreateMemberCommand implements ICommand {
  constructor(
    public readonly name: string,
    public readonly userId: string,
    public readonly spaceId: string,
  ) {}
}
