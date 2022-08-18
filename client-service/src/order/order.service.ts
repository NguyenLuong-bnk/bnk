import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/typeorm';
import { Repository } from 'typeorm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRespository: Repository<Order>,
  ) {}
  getOrder() {
    return this.orderRespository.find();
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Order>> {
    const queryBuilder = this.orderRespository.createQueryBuilder('c');
    queryBuilder.orderBy('c.userId', 'DESC');
    return paginate<Order>(queryBuilder, options);
  }
}
