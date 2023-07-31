import { Controller, Body, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from '../users/dto/user.dto';
import { DoesUserExists } from 'src/core/doesUserExist.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @UseGuards(DoesUserExists)
  @Post('signUp')
  async signUp(@Body() user: UserDto) {
    console.log('entra');
    return await this.authService.create(user);
  }
}
