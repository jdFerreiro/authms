import { Module } from '@nestjs/common';
import { AuditController } from './audit.controller';
import { AuditService } from './audit.service';
import { DatabaseModule } from 'src/core/database/database.module';
import { AuditProviders } from './audit.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [AuditController],
  providers: [AuditService, ...AuditProviders],
})
export class AuditModule {}
