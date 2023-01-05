import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { UsersService } from '../service/users.service';

export class Usuario {
  uuid: string;
  nombre: string;
  apellido: string;
  email: string;
}

let usuarios: Usuario[]= [
  {
    uuid: '0',
    nombre: 'Pepe',
    apellido: 'Gomez',
    email: 'pepe@gmail.com'
  },
  {
    uuid: '1',
    nombre: 'Martín',
    apellido: 'Gomez',
    email: 'martin@gmail.com'
  },
  {
    uuid: '2',
    nombre: 'Chris',
    apellido: 'Gomez',
    email: 'chris@gmail.com'
  }
]


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('message')
  getHello(): string {
    return this.usersService.getHello();
  }

  @Get('user')
  getUsers(): Usuario[] {
    return usuarios;
  }

  @Get('user/:uuid')
  getUserByUuid(@Param('uuid') id: string): Usuario {
    let index: number = usuarios.findIndex(u => u.uuid == id);

    return usuarios[index];
  }

  @Post('user')
  postUser(@Body() body:Usuario): Usuario {
    body.uuid = randomUUID();
    usuarios.push(body);
    return body;
  }

  @Put('user/:uuid')
  putUser(@Param('uuid') id: string, @Body() body: Usuario): Usuario {
    let index: number = usuarios.findIndex(u => u.uuid == id);
    
    usuarios[index].nombre = body.nombre;
    usuarios[index].apellido = body.apellido;
    usuarios[index].email = body.email;

    return usuarios[index];
  }

  @Patch('user/:uuid')
  patchUser(@Param('uuid') id: string, @Body() body: Usuario): Usuario {
    let index: number = usuarios.findIndex(u => u.uuid == id);

    if(body.nombre != null) {
      usuarios[index].nombre = body.nombre;
    }
    if(body.apellido != null) {
      usuarios[index].apellido = body.apellido;
    }
    if(body.email != null){
      usuarios[index].email = body.email;
    }

    return usuarios[index];
  }

  @Delete('user/:id')
  deleteUser(@Param('id') id: string): boolean {
    let index: number = usuarios.findIndex(u => u.uuid == id);

    if(index != -1) {
      usuarios.splice(index, 1);
      return true;
    }
    return false;
  }
}
