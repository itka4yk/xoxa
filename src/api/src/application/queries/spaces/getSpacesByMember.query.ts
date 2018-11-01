import { IQuery } from '@nestjs/cqrs';
import { IMySpace } from 'application/viewModels/spaces/mySpace.interface';

export class GetSpacesByMemberQuery implements IQuery<IMySpace[]> {
  memberId: string;
}