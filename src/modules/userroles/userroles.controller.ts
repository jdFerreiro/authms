import {
  Controller,
  Get,
  UseGuards,
  Request,
  Patch,
  Body,
  Delete,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserRoleService } from './userroles.service';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleDto } from '../DTOs/userRole.dto';

@ApiBearerAuth()
@ApiTags('userRole')
@Controller('userRole')
export class UserRolesController {
  constructor(private userroleService: UserRoleService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('getAll')
  async getAll() {
    return await this.userroleService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getById')
  async getById(@Request() req) {
    return await this.userroleService.findOneById(req.query.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('add')
  async add(@Request() req, @Body() role: UserRoleDto) {
    return await this.userroleService.create(role, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('delete')
  async delete(@Request() req) {
    return await this.userroleService.delete(
      req.query.userId,
      req.query.roleId,
    );
  }
}
