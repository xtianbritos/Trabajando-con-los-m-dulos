import { Module } from '@nestjs/common';
import { ContactsController } from './controller/contacts.controller';
import { ContactsService } from './service/contacts.service';

@Module({
  controllers: [ContactsController],
  providers: [ContactsService],
})
export class ContactsModule {}
