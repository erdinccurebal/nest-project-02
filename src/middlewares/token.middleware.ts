import environment from 'src/environments/environment';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { RoleService } from 'src/modules/role/role.service';
import { async } from 'rxjs';
import { resolve } from 'path';
import { rejects } from 'assert';

@Injectable()
export class TokenMiddleware implements NestMiddleware {

  use(req: Request, res: Response, next: Function) {
    const authToken = req.headers.authorization;

    let whiteUrlList = [
      '/api/auth',
      '/api/categories/all',
      '/api/navs/all',
      '/api/posts/all',
    ];
    const urlListControl = whiteUrlList.some(role =>
      req.baseUrl.includes(role),
    );

    if (!urlListControl) {
      if (!authToken) {
        next();
        throw new HttpException('Jwt could not found!', HttpStatus.FORBIDDEN);
      } else {
        try {
          const jwtControl = jwt.verify(
            authToken.slice(7, authToken.length),
            environment.jwtText,
          );
          if (jwtControl) {
            req['user'] = jwtControl.user;
            next();
            return;
          } else {
            throw new HttpException(
              'User auth could not found!',
              HttpStatus.UNAUTHORIZED,
            );
          }
        } catch (err) {
          throw new HttpException(err.message, HttpStatus.UNAUTHORIZED);
        }
      }
    }
    next();
    return;
  }
}
