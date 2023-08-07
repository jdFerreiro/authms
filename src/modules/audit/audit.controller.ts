import {
  Controller,
  Get,
  UseGuards,
  Request,
  Body,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuditService } from './audit.service';
import { AuthGuard } from '@nestjs/passport';
import { AuditDto } from '@Dtos/Audit.dto';

@ApiBearerAuth()
@ApiTags('Audit')
@Controller('Audit')
export class AuditController {
  constructor(private auditService: AuditService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('getAll')
  async getAll() {
    return await this.auditService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getById')
  async getById(@Request() req) {
    return await this.auditService.findOneById(req.query.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getByDateRange')
  async getByDateRange(@Request() req) {
    const startDate = new Date(req.query.startDate);
    const endDate = new Date(req.query.endDate);
    endDate.setDate(endDate.getDate() + 1);
    return await this.auditService.findByDateRange(startDate, endDate);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getByUserId')
  async getByUserId(@Request() req) {
    return await this.auditService.findByUser(req.query.createdBy);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('add')
  async add(@Request() req, @Body() data: AuditDto) {
    // data.ipAddress = req.clientIp;
    return await this.auditService.create(data, req.user.id);
  }
}
