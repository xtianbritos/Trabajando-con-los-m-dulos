import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Body } from '@nestjs/common';
import { userInfo } from 'os';
import { map, Observable } from 'rxjs';

@Injectable()
export class UserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map(user => {
      if(!user.lastName) {
        user.lastName = null;
      }
      return user;
    }));
  }
}
