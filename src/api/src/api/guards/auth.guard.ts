import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from 'auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const token = context.switchToHttp().getRequest().headers.authorization;
    try {
      // TODO: inject user info into context.
      await this.authService.verify(token);
      context
        .switchToHttp()
        .getRequest().userInfo = await this.authService.getUserInfo(token);
      return true;
    } catch (error) {
      return false;
    }
  }
}
