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
import { StatusService } from './status.service';
import { AuthGuard } from '@nestjs/passport';
import { StatusDto } from '@Dtos/status.dto';

@ApiBearerAuth()
@ApiTags('status')
@Controller('status')
export class StatusController {
  constructor(private statusService: StatusService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('getAll')
  async getAll() {
    return await this.statusService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getById')
  async getById(@Request() req) {
    return await this.statusService.findOneById(req.query.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('add')
  async add(@Request() req, @Body() status: StatusDto) {
    return await this.statusService.create(status, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('update')
  async update(@Request() req, @Body() status: StatusDto) {
    return await this.statusService.update(req.query.id, status, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('delete')
  async delete(@Request() req) {
    return await this.statusService.delete(req.query.id);
  }
}
