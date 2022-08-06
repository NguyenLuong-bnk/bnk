import { CreateOrderDto } from '../dto/CreateOrder.dto';
import { Order } from '../typeorm';
import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User as UserEntity } from '../typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/CreateUser.dto';
import { encodePassword } from '../users/bcrypt';
import { DeleteResult } from 'typeorm';
import { map, Observable, tap } from 'rxjs';
import { AxiosResponse } from 'axios';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) // 
    private readonly userRespository: Repository<UserEntity>,

    @InjectRepository(Order)
    private readonly orderRespository: Repository<Order>,

     @Inject('MATH_SERVICE') private client: ClientProxy,
    private readonly httpService: HttpService,
  ) {}

  findAll(createOrderDto: CreateOrderDto): Observable<AxiosResponse> {
    //console.log(createOrderDto);
    return this.httpService
      .post('http://localhost:6012/process', { ...createOrderDto })
      .pipe(
          map((resp) => resp.data),
          tap((data) => 
            {
              const order = this.orderRespository.create({
                ...data,
              });
              this.orderRespository.save(order);
              console.log(data)
              this.client.emit('notifications','The transaction was successful')
            }         
          )       
        )
  }


  getUsers() {
    return this.userRespository.find();
  }

  createUser(createUserDto: CreateUserDto) {
    const password = encodePassword(createUserDto.password);
    console.log(password);
    const newUser = this.userRespository.create({ ...createUserDto, password });
    return this.userRespository.save(newUser);
  }

  async update(id, createUserDto: CreateUserDto) {
    // console.log(createUserDto);
    // console.log(id);
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

  async findOne(username: string) {
    return this.userRespository.findOne({
      where: { username: username },
    });
  }
}
