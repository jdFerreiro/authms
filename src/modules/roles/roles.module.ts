import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RoleService } from './roles.service';
import { DatabaseModule } from 'src/core/database/database.module';
import { rolesProviders } from './roles.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [RolesController],
  providers: [RoleService, ...rolesProviders],
})
export class RolesModule {}
