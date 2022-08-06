import { Controller, Post,Get, Param } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
    constructor(
       @Inject('ORDER_SERVICE') private readonly orderService: OrderService
    ){}

    @Get(':id')
    getOrderById(@Param() params){
        return this.orderService.getOrderById(params.id)
    }
}
