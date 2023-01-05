/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersService } from './users/service/users.service';
import { TasksService } from './tasks/service/tasks.service';
import { ContactsService } from './contacts/service/contacts.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, 
    private readonly usersService: UsersService,
    private readonly tasksService: TasksService,
    private readonly contactsService: ContactsService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('users/message')
  getHello2(): string {
    return this.usersService.getHello();
  }

  @Get('tasks/message')
    getHello3(): string {
    return this.tasksService.getHello();
  }

  @Get('contacts/message')
  getHello4(): string {
    return this.contactsService.getHello();
  }

}
