import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { ContactsModule } from './contacts/contacts.module';
import { UsersController } from './users/controller/users.controller';
import { UsersService } from './users/service/users.service';
import { TasksController } from './tasks/controller/tasks.controller';
import { TasksService } from './tasks/service/tasks.service';
import { ContactsController } from './contacts/controller/contacts.controller';
import { ContactsService } from './contacts/service/contacts.service';

@Module({
  imports: [UsersModule, TasksModule, ContactsModule],
  controllers: [
    AppController,
    UsersController,
    TasksController,
    ContactsController,
  ],
  providers: [AppService, UsersService, TasksService, ContactsService],
})
export class AppModule {}
