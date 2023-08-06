import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/core/database/database.module';
import { UserRolesController } from './userroles.controller';
import { UserRoleService } from './userroles.service';
import { userRolesProviders } from './userroles.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [UserRolesController],
  providers: [UserRoleService, ...userRolesProviders],
})
export class UserRolesModule {}
