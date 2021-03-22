import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { RoleService } from '../modules/role/role.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(RoleService) private readonly roleService: RoleService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = await context.switchToHttp().getRequest();

    let whiteControl = [
      '/api/auth',
      '/api/categories/all',
      '/api/navs/all',
      '/api/posts/all',
    ];

    const urlListControl = whiteControl.some(role =>
      request.url.includes(role),
    );

    if (urlListControl) {
      return true;
    } else {
      const role = await this.roleService.findOne(request.user.roleId);

      let currentRolesList = [];

      const allowedRoles = this.reflector.get<string[]>(
        'roles',
        context.getHandler(),
      );

      role.perms.map(data => {
        currentRolesList.push(data);
      });
      
      const roleControl = currentRolesList.some(role => allowedRoles.includes(role));
      if (!roleControl) {
        throw new HttpException('Role invalid!', HttpStatus.FORBIDDEN);
      }

      if (roleControl) {
        return true;
      }
    }

    return true;
  }
}
