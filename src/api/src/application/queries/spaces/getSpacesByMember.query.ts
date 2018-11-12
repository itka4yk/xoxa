import { IQuery } from '@nestjs/cqrs';
import { IMySpace } from 'api.contract';

export class GetSpacesByMemberQuery implements IQuery<IMySpace[]> {
  memberId: string;
}
