import { IQuery } from '@nestjs/cqrs';
import { IAllSpaces } from 'api.contract';

export class GetAllSpacesQuery implements IQuery<IAllSpaces> {
  constructor(public readonly userId: string) {}
}
