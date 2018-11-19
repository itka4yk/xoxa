import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  UseGuards,
  UsePipes,
  Req,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ICreateNewMember, createNewMemberSchema } from 'api.contract';
import { GetMemberInfoQuery } from '../../application/queries/members/getMemberInfo.query';
import { CommandBus } from '../../application/CommandBus';
import { HttpValidationPipe } from '../../shared/pipes/httpValidation.pipe';
import { AuthGuard } from '../guards/auth.guard';
import { CreateMemberCommand } from '../../application/commands/members/createMember.command';

@Controller('api/members')
@UseGuards(AuthGuard)
export class MembersController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get()
  async getMemberInfo(@Query() { userId }: GetMemberInfoQuery) {
    const query = new GetMemberInfoQuery(userId);
    return await this.queryBus.execute(query);
  }

  @Post()
  @UsePipes(new HttpValidationPipe(createNewMemberSchema))
  async createNewMember(
    @Body() createNewMemberDto: ICreateNewMember,
    @Req() { userInfo },
  ) {
    const command = new CreateMemberCommand(
      createNewMemberDto.name,
      userInfo.id,
      createNewMemberDto.spaceId,
    );
    await this.commandBus.execute(command);
  }
}
