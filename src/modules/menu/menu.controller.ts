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
import { MenuService } from './menu.service';
import { AuthGuard } from '@nestjs/passport';
import { MenuDto } from '@Dtos/menu.dto';

@ApiBearerAuth()
@ApiTags('menu')
@Controller('menu')
export class MenuController {
  constructor(private menuService: MenuService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('getAll')
  async getAll() {
    return await this.menuService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getById')
  async getById(@Request() req) {
    return await this.menuService.findOneById(req.query.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('add')
  async add(@Request() req, @Body() role: MenuDto) {
    return await this.menuService.create(role, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('update')
  async update(@Request() req, @Body() role: MenuDto) {
    return await this.menuService.update(role, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('delete')
  async delete(@Request() req) {
    return await this.menuService.delete(req.query.id);
  }
}
