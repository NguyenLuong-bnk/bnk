import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import entities from './typeorm';
import { AuthModule } from './Authen/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({ // method forRoot
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'bt_bnk',
      entities: entities,
      synchronize: true, // xác định csdl có tự đồng bộ nếu entities thay đổi hay không
    }),
    UsersModule, AuthModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
