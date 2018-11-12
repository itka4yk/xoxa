import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetMemberInfoQuery } from '../../queries/members/getMemberInfo.query';
import { IMemberInfo } from 'api.contract';
import { MembersRepository } from '../../../infrastructure/repositories/members.repository';

@QueryHandler(GetMemberInfoQuery)
export class GetMemberInfoQueryHandler
  implements IQueryHandler<GetMemberInfoQuery, IMemberInfo> {
  constructor(private readonly membersRepository: MembersRepository) {}

  async execute(query: GetMemberInfoQuery): Promise<IMemberInfo> {
    return await this.membersRepository.dbSet.findOne({ userId: query.userId });
  }
}
