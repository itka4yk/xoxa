import { Controller, Post, Body, Req, Guard, UseGuards, Get } from '@nestjs/common';
import { CreateNewSpaceCommand } from '../../application/commands/spaces/createNewSpace.command';
import { CommandBus } from '../../application/CommandBus';
import { AuthGuard } from 'api/guards/auth.guard';
import { QueryBus } from '@nestjs/cqrs';
import { GetSpacesByMemberQuery } from 'application/queries/spaces/getSpacesByMember.query';

@Controller('spaces')
@UseGuards(AuthGuard)
export class SpacesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async createNewSpace(@Body() commandDto: CreateNewSpaceCommand, @Req() { userInfo } ) {
    const command = new CreateNewSpaceCommand();
    Object.assign(command, { ...commandDto, admin: userInfo.id });
    return await this.commandBus.execute(command);
  }

  @Get()
  async getSpaces(@Req() { userInfo } ) {
    const query = new GetSpacesByMemberQuery();
    query.memberId = userInfo.id;
    return await this.queryBus.execute(query);
  }
}
