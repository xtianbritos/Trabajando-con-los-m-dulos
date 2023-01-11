import { Injectable, NestMiddleware, Body } from '@nestjs/common';
import { Request, Response } from 'express';
import { stringify } from 'querystring';
 
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    console.log(req.body);
    if(req.method == 'PUT') {
      console.log(req.params);
    }
    next();
  }
}