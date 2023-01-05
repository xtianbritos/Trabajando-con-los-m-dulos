/* eslint-disable prettier/prettier */
import { Controller } from '@nestjs/common';

@Controller('contacts')
export class ContactsController {
  getHello(): string {
    return'Hola desde el servicio de Contacts';
  }
}
