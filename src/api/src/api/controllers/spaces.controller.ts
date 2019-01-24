import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { CreateNewSpaceCommand } from '../../application/commands/spaces/createNewSpace.command';
import { CommandBus } from '../../application/CommandBus';
import { AuthGuard } from 'api/guards/auth.guard';
import { QueryBus } from '@nestjs/cqrs';
import { GetSpacesByUserQuery } from 'application/queries/spaces/getSpacesByUserQuery';
import {
  assignNewUserSchema,
  createNewSpaceSchema,
  inviteNewUserSchema,
} from 'api.contract';
import { HttpValidationPipe } from 'shared/pipes/httpValidation.pipe';
import { AssignNewUserCommand } from 'application/commands/spaces/assignNewUser.command';
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
    const query = new GetSpacesByUserQuery();
    query.userId = userInfo.id;
    return await this.queryBus.execute(query);
  }

  @Post('assignNewUser')
  @UsePipes(new HttpValidationPipe(assignNewUserSchema))
  async assignNewUser(@Body() commandDto, @Req() { userInfo }) {
    const command = new AssignNewUserCommand();
    Object.assign(command, { ...commandDto, applierId: userInfo.id });
    return await this.commandBus.execute(command);
  }

  @Post('inviteUser')
  @UsePipes(new HttpValidationPipe(inviteNewUserSchema))
  async inviteNewUser(@Body() commandDto, @Req() { userInfo }) {
    const command = new InviteNewUserCommand();
    Object.assign(command, { ...commandDto, applierId: userInfo.id });
    return await this.commandBus.execute(command);
  }
}
