import { IQuery } from '@nestjs/cqrs';
import { IMemberInfo } from 'api.contract';

export class GetMemberInfoQuery implements IQuery<IMemberInfo> {
  constructor(public readonly userId) {}
}
