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
import { RoleService } from './roles.service';
import { AuthGuard } from '@nestjs/passport';
import { RoleDto } from '@Dtos/role.dto';

@ApiBearerAuth()
@ApiTags('role')
@Controller('role')
export class RolesController {
  constructor(private roleService: RoleService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('getAll')
  async getAll() {
    return await this.roleService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getById')
  async getById(@Request() req) {
    return await this.roleService.findOneById(req.query.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('add')
  async add(@Request() req, @Body() data: RoleDto) {
    return await this.roleService.create(data, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('update')
  async update(@Request() req, @Body() data: RoleDto) {
    return await this.roleService.update(req.query.id, data, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('delete')
  async delete(@Request() req) {
    return await this.roleService.delete(req.query.id);
  }
}
