import { Module } from '@nestjs/common';
import { StatusController } from './status.controller';
import { DatabaseModule } from 'src/core/database/database.module';
import { StatusService } from './status.service';
import { statusesProviders } from './status.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [StatusController],
  providers: [StatusService, ...statusesProviders],
})
export class StatusModule {}
