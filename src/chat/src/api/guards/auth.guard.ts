import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from 'auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const token = context.switchToHttp().getRequest().headers.authorization;
    try {
      // TODO: inject user info into context.
      const user = await this.authService.verify(token);
      return true;
    } catch (error) {
      return false;
    }
  }
}
