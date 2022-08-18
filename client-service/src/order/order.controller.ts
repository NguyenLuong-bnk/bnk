import {
  Controller,
  DefaultValuePipe,
  Get,
  Inject,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Order } from 'src/typeorm';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(
    @Inject('ORDER_SERVICE') private readonly orderService: OrderService,
  ) {}

  @Get('')
  async index(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ): Promise<Pagination<Order>> {
    limit = limit > 100 ? 100 : limit;
    return this.orderService.paginate({
      page,
      limit,
      route: 'http://localhost:3000/order',
    });
  }
}
