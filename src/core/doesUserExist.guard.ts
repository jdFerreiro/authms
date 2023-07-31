import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class DoesUserExists implements CanActivate {
  constructor(private readonly userService: UsersService) {}

  async validateRequest(request) {
    const userExists = await this.userService.findOneByEmail(
      request.body.email,
    );

    if (userExists) {
      throw new ForbiddenException('This email already exist');
    }

    return true;
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }
}
