import {
  Controller,
  Body,
  Post,
  UseGuards,
  Request,
  Patch,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from '@Dtos/user.dto';
import { DoesUserExists } from 'src/core/doesUserExist.guard';
import { ApiParam, ApiTags } from '@nestjs/swagger';
// import { ApiKeyAuthGuard } from 'src/guards/apikey-auth.guard';

@ApiTags('auth')
// @UseGuards(ApiKeyAuthGuard)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @HttpCode(202)
  @ApiParam({ name: 'email', required: true, description: 'user email' })
  @ApiParam({ name: 'password', required: true, description: 'user password' })
  async login(@Request() req: any) {
    return await this.authService.login(req.body);
  }

  @UseGuards(DoesUserExists)
  @Post('signUp')
  @HttpCode(201)
  async signUp(@Body() user: UserDto) {
    return await this.authService.create(user);
  }

  @UseGuards(AuthGuard('local'))
  @Patch('changePassword')
  @HttpCode(200)
  async changePassword(@Request() req: any) {
    return await this.authService.changePassword(
      req.query.id,
      req.query.password,
      req.query.newPassword,
    );
  }
}
