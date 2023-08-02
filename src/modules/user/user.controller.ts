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
import { UserDto } from 'src/modules/users/dto/user.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('getAll')
  async getAll() {
    return await this.userService.getAllUsers();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getById')
  async getById(@Request() req) {
    return await this.userService.findOneById(req.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getByEmail')
  async getByEmail(@Request() req) {
    return await this.userService.findOneByEmail(req.email);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('update')
  async update(@Body() user: UserDto) {
    return await this.userService.update(user.id, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('changeStatus')
  async changeStatus(@Body() data: any) {
    return await this.userService.changeStatus(data.id, data.statusId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('delete')
  async delete(@Request() req) {
    return await this.userService.delete(req.id);
  }
}
