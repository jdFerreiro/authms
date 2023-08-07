import {
  Controller,
  Get,
  UseGuards,
  Request,
  Body,
  Delete,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MenuRoleService } from './menuroles.service';
import { AuthGuard } from '@nestjs/passport';
import { MenuRoleDto } from '@Dtos/MenuRole.dto';

@ApiBearerAuth()
@ApiTags('MenuRole')
@Controller('MenuRole')
export class MenuRolesController {
  constructor(private MenuroleService: MenuRoleService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('getAll')
  async getAll() {
    return await this.MenuroleService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getById')
  async getById(@Request() req) {
    return await this.MenuroleService.findOneById(req.query.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('add')
  async add(@Request() req, @Body() data: MenuRoleDto) {
    return await this.MenuroleService.create(data, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('delete')
  async delete(@Request() req) {
    return await this.MenuroleService.delete(
      req.query.roleId,
      req.query.menuId,
    );
  }
}
