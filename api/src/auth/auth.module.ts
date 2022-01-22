import { MikroOrmModule } from '@mikro-orm/nestjs';
import { HttpModule } from '@nestjs/axios';
import type { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MockSessionMiddleware } from '../shared/modules/authorization/mock-session.middleware';
import { User } from '../users/user.entity';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { MyEfreiAuthGuard } from './myefrei-auth.guard';
import { MyEfreiStrategy } from './myefrei.strategy';

@Module({
  imports: [
    MikroOrmModule.forFeature([User]),
    ConfigModule,
    JwtModule.register({}),
    UsersModule,
    HttpModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthGuard, MyEfreiAuthGuard, MyEfreiStrategy],
  exports: [JwtAuthGuard, AuthService, JwtModule, ConfigModule, UsersModule],
})
export class AuthModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(MockSessionMiddleware)
      .forRoutes('*myefrei*');
  }
}
