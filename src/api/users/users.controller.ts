import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBody } from '@nestjs/swagger';
import { CreateUserCommand } from 'src/application/users/commands/create-user.command';
import { DeleteUserCommand } from 'src/application/users/commands/delete-user.command';
import { UpdateUserCommand } from 'src/application/users/commands/update-user.command';
import { CreateUserDto } from 'src/application/users/dtos/create-user.dto';
import { UpdateUserDto } from 'src/application/users/dtos/update-user.dto';
import { GetUserQuery } from 'src/application/users/queries/get-user.query';
import { GetUsersQuery } from 'src/application/users/queries/get-users.query';
import { User } from 'src/domain/users/user';

@Controller('users')
export class UsersController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.queryBus.execute(new GetUsersQuery());
  }

  @Get(':id')
  async find(@Param('id') id: number): Promise<User> {
    return this.queryBus.execute(new GetUserQuery(id));
  }

  @Post()
  @ApiBody({ type: CreateUserDto })
  async create(@Body() user: CreateUserDto): Promise<void> {
    return this.commandBus.execute(new CreateUserCommand(user));
  }

  @Put()
  @ApiBody({ type: UpdateUserDto })
  async update(@Body() user: UpdateUserDto): Promise<void> {
    return this.commandBus.execute(new UpdateUserCommand(user));
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.commandBus.execute(new DeleteUserCommand(id));
  }
}
