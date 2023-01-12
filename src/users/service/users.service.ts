import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { GetUserDto } from '../dtos/getuser.dto';
import { PatchUserDto } from '../dtos/patchuser.dto';
import { PostUserDto } from '../dtos/postuser.dto';
import { PutUserDto } from '../dtos/putuser.dto';
import { UserInterface } from '../interfaces/user.interface';


@Injectable()
export class UsersService {

  private users: UserInterface[] = [
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

  getHello(): string {
    return 'Hola desde el servicio de Users';
  }

  get(): GetUserDto[] {
    return this.users;
  }

  getUser(uuid: string): GetUserDto {
    let index: number = this.users.findIndex(u => u.uuid == uuid.toString());

    if(index != -1) {
      return this.users[index];
    }
    else {
      throw new HttpException(`No existe el usuario con el uuid: ${uuid}`, HttpStatus.NOT_FOUND);
    }

  }

  post(user: PostUserDto): GetUserDto {
    user.uuid = uuid();

    if(user.lastName == null) {
      user.lastName = undefined;
    }

    this.users.push(user);

    return user;
  }

  put(uuid: string, body: PutUserDto): GetUserDto {
    let index: number = this.users.findIndex(u => u.uuid == uuid.toString());

    if(index != -1) {
      body.uuid = uuid;
  
      this.users[index] = body;
  
      return this.users[index];
    }
    else {
      throw new HttpException(`No existe el usuario con el uuid: ${uuid}`, HttpStatus.NOT_FOUND);
    }
  }

  patch(uuid: string, body: PatchUserDto): GetUserDto {
    let index: number = this.users.findIndex(u => u.uuid == uuid.toString());

    if(index != -1) {
      if(body.name != null) {
        this.users[index].name = body.name;
      }
      if(body.lastName != null) {
        this.users[index].lastName = body.lastName;
      }
      if(body.email != null) {
        this.users[index].email = body.email;
      }
  
      return this.users[index];
    }
    else {
      throw new HttpException(`No existe el usuario con el uuid: ${uuid}`, HttpStatus.NOT_FOUND);
    }
  }

  delete(uuid: string): void {
    let index: number = this.users.findIndex(u => u.uuid == uuid.toString());

    if(index != -1) {
      this.users.splice(index, 1);
    }
    else {
      throw new HttpException(`No existe el usuario con el uuid: ${uuid}`, HttpStatus.NOT_FOUND);
    }
  }
}
