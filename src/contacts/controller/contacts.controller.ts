import { Controller, Get, Post, Put, Patch, Delete, Param, Body } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ContactsService } from '../service/contacts.service';


export class Contacto {
  uuid: string;
  usuarioUuid: string;
  nombre: string;
  apellidos: string;
  teléfono: number;
  correo: string;
}

let contactos: Contacto[]= [
  {
    uuid: randomUUID(),
    usuarioUuid: 'usuario0',
    nombre: 'Juan',
    apellidos: 'Gomez',
    teléfono: 123456789,
    correo: 'juan@gmail.com'
  },{
    uuid: randomUUID(),
    usuarioUuid: 'usuario1',
    nombre: 'Pepe',
    apellidos: 'Gomez',
    teléfono: 123456789,
    correo: 'pepe@gmail.com'
  },{
    uuid: randomUUID(),
    usuarioUuid: 'usuario2',
    nombre: 'Matias',
    apellidos: 'Gomez',
    teléfono: 123456789,
    correo: 'matias@gmail.com'
  }

  
]


@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Get('message')
  getHello4(): string {
    return this.contactsService.getHello();
  }

  @Get('contact')
  getContacts(): Contacto[] {
    return contactos;
  }

  @Get('contact/:uuid')
  getContactByUuid(@Param('uuid') id: string): Contacto {
    let index: number = contactos.findIndex(c => c.uuid == id);

    return contactos[index];
  }

  @Post('contact')
  postContact(@Body() body:Contacto): Contacto {
    body.uuid = randomUUID();
    contactos.push(body);
    return body;
  }

  @Put('contact/:uuid')
  putContact(@Param('uuid') id: string, @Body() body: Contacto): Contacto {
    let index: number = contactos.findIndex(c => c.uuid == id);
    
    contactos[index].usuarioUuid = body.usuarioUuid;
    contactos[index].nombre = body.nombre;
    contactos[index].apellidos = body.apellidos;
    contactos[index].correo = body.correo;
    contactos[index].teléfono = body.teléfono;

    return contactos[index];
  }

  @Patch('contact/:uuid')
  patchContact(@Param('uuid') id: string, @Body() body: Contacto): Contacto {
    let index: number = contactos.findIndex(c => c.uuid == id);

    if(body.usuarioUuid != null) {
      contactos[index].usuarioUuid = body.usuarioUuid;
    }
    if(body.nombre != null) {
      contactos[index].nombre = body.nombre;
    }
    if(body.apellidos != null) {
      contactos[index].apellidos = body.apellidos;
    }
    if(body.correo != null) {
      contactos[index].correo = body.correo;
    }
    if(body.teléfono != null) {
      contactos[index].teléfono = body.teléfono;
    }

    return contactos[index];
  }

  @Delete('contact/:id')
  deleteContact(@Param('id') id: string): boolean {
    let index: number = contactos.findIndex(c => c.uuid == id);

    if(index != -1) {
      contactos.splice(index, 1);
      return true;
    }
    return false;
  }
}
