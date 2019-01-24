import { IQuery } from '@nestjs/cqrs';
import { IMySpace } from 'api.contract';

export class GetSpacesByUserQuery implements IQuery<IMySpace[]> {
  userId: string;
}
