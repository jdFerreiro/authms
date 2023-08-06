import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/core/database/database.module';
import { MenuRolesController } from './menuroles.controller';
import { MenuRoleService } from './menuroles.service';
import { menuRolesProviders } from './menuroles.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [MenuRolesController],
  providers: [MenuRoleService, ...menuRolesProviders],
})
export class MenuRolesModule {}
