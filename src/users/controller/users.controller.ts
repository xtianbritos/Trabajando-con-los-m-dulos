import { Body, Controller, Delete, Get, HttpStatus, Param, ParseUUIDPipe, Patch, Post, Put } from '@nestjs/common';
import { HttpCode } from '@nestjs/common/decorators';
import { STATUS_CODES } from 'http';
import { GetUserDto } from '../dtos/getuser.dto';
import { PatchUserDto } from '../dtos/patchuser.dto';
import { PostUserDto } from '../dtos/postuser.dto';
import { UsersService } from '../service/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get('message')
  getHello(): string {
    return this.service.getHello();
  }

  @Get('user')
  getUsers(): GetUserDto[] {
    return this.service.get();
  }

  @Get('user/:uuid')
  getUser(@Param('uuid', new ParseUUIDPipe()) uuid: string): GetUserDto {
    return this.service.getUser(uuid);
  }

  @Post('user')
  PostUser(@Body() body: PostUserDto): GetUserDto {
    return this.service.post(body);
  }

  @Put('user/:uuid')
  PutUser(@Param('uuid', new ParseUUIDPipe()) uuid: string, @Body() body: PostUserDto): GetUserDto {
    return this.service.put(uuid, body);
  }

  @Patch('user/:uuid')
  PatchUser(@Param('uuid', new ParseUUIDPipe()) uuid: string, @Body() body: PatchUserDto): GetUserDto {
    return this.service.patch(uuid, body);
  }

  @Delete('user/:uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  DeleteUSer(@Param('uuid', new ParseUUIDPipe()) uuid: string): void {
    this.service.delete(uuid);
  }
}
