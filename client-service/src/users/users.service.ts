import { CreateOrderDto } from '../dto/CreateOrder.dto';
import { Order } from '../typeorm';
import { HttpService } from '@nestjs/axios';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Req,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User as UserEntity } from '../typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/CreateUser.dto';
import { encodePassword } from '../users/bcrypt';
import { DeleteResult } from 'typeorm';
import { map, tap } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRespository: Repository<UserEntity>,

    @InjectRepository(Order)
    private readonly orderRespository: Repository<Order>,

    @Inject('MATH_SERVICE') private client: ClientProxy,
    private readonly httpService: HttpService,
  ) {}

  getUsers() {
    return this.userRespository.find();
  }

  createUser(createUserDto: CreateUserDto) {
    const password = encodePassword(createUserDto.password);
    const newUser = this.userRespository.create({ ...createUserDto, password });
    return this.userRespository.save(newUser);
  }

  async update(id, createUserDto: CreateUserDto) {
    const password = encodePassword(createUserDto.password);
    const user = await this.userRespository.create({
      ...createUserDto,
      password,
    });
    return await this.userRespository.update(id, user);
  }

  async delete(id): Promise<DeleteResult> {
    return await this.userRespository.delete(id);
  }

  async findUserByUsername(username: string) {
    return this.userRespository.findOne({
      where: { username: username },
    });
  }

  // transferReceiver
  async transferReceiver(id: number, amount: number) {
    const userReceiver = await this.userRespository.findOne({
      where: {
        id: id,
      },
    });

    const balance = userReceiver.balance + amount;
    return this.userRespository.update(+id, { balance });
  }

  // transferSender
  async transferSender(id: number, amount: number) {
    const userSender = await this.userRespository.findOne({
      where: {
        id: id,
      },
    });

    if (userSender.balance >= amount) {
      const balance = userSender.balance - amount;
      return this.userRespository.update(+id, { balance });
    }
    throw new HttpException('', HttpStatus.BAD_REQUEST);
  }

  async creatOrder(
    createOrderDto: CreateOrderDto,
    @Req() req: any,
  ): Promise<any> {
    const userIdTo = await this.userRespository.findOne({
      where: {
        id: createOrderDto.to,
      },
    });

    if (!userIdTo) {
      throw new HttpException('userSender NOT FOUND', HttpStatus.NOT_FOUND);
    }

    const userId = req.user.userId;
    const userToId = userIdTo.id;
    const amount = createOrderDto.amount;
    const createOrder = { userId, userToId, amount };

    await this.transferReceiver(userToId, amount);
    await this.transferSender(userId, amount);

    return this.httpService
      .post('http://localhost:6012/process', { ...createOrder })
      .pipe(
        map((resp) => resp.data),
        tap((data) => {
          console.log('data:', data);
          this.orderRespository.save(data);
          this.client.emit('notifications', 'The transaction was successful');
        }),
      );
  }

  // search history by id
  async findOrderById(userId: number) {
    return await this.orderRespository.find({
      where: {
        userId: userId,
      },
    });
  }
}
