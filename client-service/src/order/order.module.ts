import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Order } from 'src/typeorm/Order';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports:[TypeOrmModule.forFeature([Order]) ],
  controllers: [OrderController],
  providers:
    [
      {
        provide: 'ORDER_SERVICE',
        useClass: OrderService,
      },
    ],
})
export class OrderModule {}
