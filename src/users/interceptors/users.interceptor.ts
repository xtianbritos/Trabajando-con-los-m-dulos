import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Body } from '@nestjs/common';
import { map, Observable } from 'rxjs';

// @Injectable()
// export class UsersInterceptor implements NestInterceptor {
//   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//     return next.handle().pipe(map(users => {
//       for (const user of users) {
//         if(!user.lastName) {
//           user.lastName = null;
//         }
//       }
//       return users;
//     }));
//   }
// }

@Injectable()
export class UsersInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map(u => {
      //Si u no tiene name, lo que llegó es una lista de usuarios
      if(!u.name) {
        for (const user of u) {
          if(!user.lastName) {
              user.lastName = null;
            }
          }
        return u;
      }
      //Si u sí tiene name, es un usuario
      if(!u.lastName) {
        u.lastName = null;
      }
      return u;
    }));
  }
}