import { Module } from '@nestjs/common';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { DatabaseModule } from 'src/core/database/database.module';
import { menuProviders } from './menu.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [MenuController],
  providers: [MenuService, ...menuProviders],
})
export class MenuModule {}
