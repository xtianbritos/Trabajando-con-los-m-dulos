import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Body } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Length } from 'class-validator';

@Injectable()
export class UsersInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map(users => {
      for (const user of users) {
        if(!user.lastName) {
          user.lastName = null;
        }
      }
      return users;
    }));
  }
}
