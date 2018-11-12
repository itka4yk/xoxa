import { Controller, Get, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetMemberInfoQuery } from '../../application/queries/members/getMemberInfo.query';

@Controller('api/members')
export class MessagesController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  async getMemberInfo(@Query() { userId }: GetMemberInfoQuery) {
    const query = new GetMemberInfoQuery(userId);
    return await this.queryBus.execute(query);
  }
}
