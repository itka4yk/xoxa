import { ICommand } from '@nestjs/cqrs';

export class RenameMemberCommand implements ICommand {
  constructor(public readonly id: string, public readonly newName: string) {}
}
