import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from 'users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly usersService: UserService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const token = context.switchToHttp().getRequest().headers.authorization;
    try {
      this.usersService.validate(token);
      return true;
    } catch (error) {
      return false;
    }
  }
}