import { AuthModule } from '../Authen/auth.module';
import { JwtStrategy } from '../Authen/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { Order, User } from '../typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from '../users/users.controller';
import { UsersService } from '../users/users.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [ 
    TypeOrmModule.forFeature([User, Order]),
     PassportModule,
     HttpModule,
     ClientsModule.register([
      {
        name: 'MATH_SERVICE',
        transport: Transport.MQTT,
        options: {
          url: 'mqtt://localhost:1883',
        }
      },
      ]),
    ],
     
  
  controllers: [UsersController], 
  providers: [UsersService,JwtStrategy], 
  exports:[UsersService] 
})
export class UsersModule {}
