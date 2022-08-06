import { JwtStrategy } from '../Authen/jwt.strategy';
import { LocalStrategy } from '../Authen/local.strategy';
import { UsersModule } from 'src/users/users.module';
import { Module } from '@nestjs/common';
import { AuthService } from '../Authen/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order, User } from 'src/typeorm';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
      UsersModule,
      PassportModule,
      JwtModule.register({
        secret: 'SECRET',
        signOptions: { expiresIn: '60s' },
      }),
      TypeOrmModule.forFeature([User, Order]),
      HttpModule,
    ],

  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
