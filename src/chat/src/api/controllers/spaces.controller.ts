import { Controller, Post, Body } from '@nestjs/common';
import { CreateNewSpaceCommand } from '../../application/commands/spaces/createNewSpace.command';
import { CommandBus } from '../../application/CommandBus';

@Controller('spaces')
export class SpacesController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async createNewSpace(@Body() commandDto: CreateNewSpaceCommand ) {
    const command = new CreateNewSpaceCommand();
    Object.assign(command, commandDto);
    return await this.commandBus.execute(command);
  }
}
