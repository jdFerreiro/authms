import {
  Controller,
  Get,
  Patch,
  UseGuards,
  Request,
  Body,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { UserDto } from 'src/modules/DTOs/user.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('getAll')
  async getAll() {
    return await this.userService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getById')
  async getById(@Request() req) {
    return await this.userService.findOneById(req.query.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getByEmail')
  async getByEmail(@Request() req) {
    return await this.userService.findOneByEmail(req.query.email);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('update')
  async update(@Request() req, @Body() user: UserDto) {
    return await this.userService.update(user.id, user, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('changeStatus')
  async changeStatus(@Request() req, @Body() data: any) {
    return await this.userService.changeStatus(
      data.id,
      data.statusId,
      req.user.id,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('delete')
  async delete(@Request() req) {
    return await this.userService.delete(req.query.id, req.user.id);
  }
}
