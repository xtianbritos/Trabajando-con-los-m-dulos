import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { GetUserDto } from '../dtos/getuser.dto';
import { PatchUserDto } from '../dtos/patchuser.dto';
import { PostUserDto } from '../dtos/postuser.dto';

let users: GetUserDto[] = [
  {
    uuid: uuid(),
    name: "Christian",
    email: "chbritos@gmail.com"
  },
  {
    uuid: uuid(),
    name: "Manuel",
    lastName: "Merello",
    email: "manu@gmail.com"
  }
]

@Injectable()
export class UsersService {
  getHello(): string {
    return 'Hola desde el servicio de Users';
  }

  get(): GetUserDto[] {
    return users;
  }

  getUser(uuid: string): GetUserDto {
    let index: number = users.findIndex(u => u.uuid == uuid.toString());

    return users[index];
  }

  post(user: PostUserDto): GetUserDto {
    user.uuid = uuid();

    if(user.lastName == null) {
      user.lastName = undefined;
    }

    users.push(user);

    return user;
  }

  put(uuid: string, body: PostUserDto): GetUserDto {
    let index: number = users.findIndex(u => u.uuid == uuid.toString());

    body.uuid = uuid;

    users[index] = body;

    return users[index];
  }

  patch(uuid: string, body: PatchUserDto): GetUserDto {
    let index: number = users.findIndex(u => u.uuid == uuid.toString());

    if(body.name != null) {
      users[index].name = body.name;
    }
    if(body.lastName != null) {
      users[index].lastName = body.lastName;
    }
    if(body.email != null) {
      users[index].email = body.email;
    }

    return users[index];
  }

  delete(uuid: string): void {
    let index: number = users.findIndex(u => u.uuid == uuid.toString());

    users.splice(index, 1);
  }
}
