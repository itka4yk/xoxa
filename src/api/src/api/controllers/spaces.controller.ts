import { Controller, Post, Body, Req, Guard, UseGuards, Get, UsePipes } from '@nestjs/common';
import { CreateNewSpaceCommand } from '../../application/commands/spaces/createNewSpace.command';
import { CommandBus } from '../../application/CommandBus';
import { AuthGuard } from 'api/guards/auth.guard';
import { QueryBus } from '@nestjs/cqrs';
import { GetSpacesByMemberQuery } from 'application/queries/spaces/getSpacesByMember.query';
import { ICreateNewSpaceDto, createNewSpaceSchema } from 'api.contract';
import { JoiValidationPipe } from 'joiValidation.pipe';

@Controller('api/spaces')
@UseGuards(AuthGuard)
export class SpacesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @UsePipes(new JoiValidationPipe(createNewSpaceSchema))
  async createNewSpace(@Body() commandDto, @Req() { userInfo } ) {
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
