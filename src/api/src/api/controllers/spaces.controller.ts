import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { CreateNewSpaceCommand } from '../../application/commands/spaces/createNewSpace.command';
import { CommandBus } from '../../application/CommandBus';
import { AuthGuard } from 'api/guards/auth.guard';
import { QueryBus } from '@nestjs/cqrs';
import { GetSpacesByMemberQuery } from 'application/queries/spaces/getSpacesByMember.query';
import {
  assignNewUserSchema,
  createNewSpaceSchema,
  inviteNewUserSchema,
} from 'api.contract';
import { HttpValidationPipe } from 'shared/pipes/httpValidation.pipe';
import { AssignNewUserCommand } from 'application/commands/spaces/assignNewUser.command';
import { GetSpaceMembersQuery } from '../../application/queries/spaces/getSpaceMembersQuery';
import { GetAllSpacesQuery } from '../../application/queries/spaces/getAllSpacesQuery';
import { InviteNewUserCommand } from '../../application/commands/spaces/inviteNewUser.command';

@Controller('api/spaces')
@UseGuards(AuthGuard)
export class SpacesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @UsePipes(new HttpValidationPipe(createNewSpaceSchema))
  async createNewSpace(@Body() commandDto, @Req() { userInfo }) {
    const command = new CreateNewSpaceCommand();
    Object.assign(command, { ...commandDto, adminId: userInfo.id });
    return await this.commandBus.execute(command);
  }

  @Get()
  async getSpaces(@Req() { userInfo }) {
    const query = new GetSpacesByMemberQuery();
    query.memberId = userInfo.id;
    return await this.queryBus.execute(query);
  }

  @Post('assignNewUser')
  @UsePipes(new HttpValidationPipe(assignNewUserSchema))
  async assignNewUser(@Body() commandDto, @Req() { userInfo }) {
    const command = new AssignNewUserCommand();
    Object.assign(command, { ...commandDto, applierId: userInfo.id });
    return await this.commandBus.execute(command);
  }

  @Get('spaceMembers')
  async getSpaceMembers(@Query() { spaceId }, @Req() { userInfo }) {
    const query = new GetSpaceMembersQuery(spaceId, userInfo.id);
    return await this.queryBus.execute(query);
  }

  @Get('allSpaces')
  async getAllSpaces(@Req() { userInfo }) {
    const query = new GetAllSpacesQuery(userInfo.id);
    return await this.queryBus.execute(query);
  }

  @Post('inviteUser')
  @UsePipes(new HttpValidationPipe(inviteNewUserSchema))
  async inviteNewUser(@Body() commandDto, @Req() { userInfo }) {
    const command = new InviteNewUserCommand();
    Object.assign(command, { ...commandDto, applierId: userInfo.id });
    return await this.commandBus.execute(command);
  }
}
