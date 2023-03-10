import { Body, Controller, Delete, Get, HttpStatus, Param, ParseUUIDPipe, Patch, Post, Put } from '@nestjs/common';
import { HttpCode, UseGuards, UseInterceptors } from '@nestjs/common/decorators';
import { GetUserDto } from '../dtos/getuser.dto';
import { PatchUserDto } from '../dtos/patchuser.dto';
import { PostUserDto } from '../dtos/postuser.dto';
import { PutUserDto } from '../dtos/putuser.dto';
import { AuthGuard } from '../guards/auth.guard';
import { UsersService } from '../service/users.service';
import { UsersInterceptor } from '../interceptors/users.interceptor';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get('message')
  getHello(): string {
    return this.service.getHello();
  }

  @UseInterceptors(UsersInterceptor)
  @Get('user')
  getUsers(): GetUserDto[] {
    return this.service.get();
  }
  
  @UseInterceptors(UsersInterceptor)
  @Get('user/:uuid')
  getUser(@Param('uuid', new ParseUUIDPipe()) uuid: string): GetUserDto {
    return this.service.getUser(uuid);
  }
  
  @UseInterceptors(UsersInterceptor)
  @UseGuards(AuthGuard)
  @Post('user')
  PostUser(@Body() body: PostUserDto): GetUserDto {
    return this.service.post(body);
  }

  @UseInterceptors(UsersInterceptor)
  @UseGuards(AuthGuard)
  @Put('user/:uuid')
  PutUser(@Param('uuid', new ParseUUIDPipe()) uuid: string, @Body() body: PutUserDto): GetUserDto {
    return this.service.put(uuid, body);
  }

  @UseInterceptors(UsersInterceptor)
  @UseGuards(AuthGuard)
  @Patch('user/:uuid')
  PatchUser(@Param('uuid', new ParseUUIDPipe()) uuid: string, @Body() body: PatchUserDto): GetUserDto {
    return this.service.patch(uuid, body);
  }

  @UseGuards(AuthGuard)
  @Delete('user/:uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  DeleteUSer(@Param('uuid', new ParseUUIDPipe()) uuid: string): void {
    this.service.delete(uuid);
  }
}
