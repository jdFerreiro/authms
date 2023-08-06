import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './core/database/database.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RolesModule } from './modules/roles/roles.module';
import { StatusModule } from './modules/status/status.module';
import { MenuModule } from './modules/menu/menu.module';
import { UserRolesModule } from './modules/userroles/userroles.module';
import { MenuRolesModule } from './modules/menuroles/menuroles.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    UserModule,
    RolesModule,
    StatusModule,
    MenuModule,
    UserRolesModule,
    MenuRolesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
