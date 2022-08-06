import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRespository: Repository<Order>,
    ){}

    async getOrderById(orderId: string) {
        return this.orderRespository.findOne({
          where: { orderId: orderId },
        });
      }
}
