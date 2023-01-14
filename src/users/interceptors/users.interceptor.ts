import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class UsersInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map(u => {
      //Si es una isntancia de un array, lo que llegó es una lista de usuarios
      if(u instanceof Array) {
        for (const user of u) {
          if(!user.lastName) {
              user.lastName = null;
            }
          }
        return u;
      }
      //Si no, es un usuario
      if(!u.lastName) {
        u.lastName = null;
      }
      return u;
    }));
  }
}