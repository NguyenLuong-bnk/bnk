import {
  Controller,
  Post,
  Put,
  Delete,
  ValidationPipe,
  Body,
  UsePipes,
  Get,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../dto/CreateUser.dto';
import { JwtAuthGuard } from '../Authen/jwt-auth.guard';
import { CreateOrderDto } from 'src/dto/CreateOrder.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
// @UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('')
  getUser() {
    return this.userService.getUsers();
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.userService.delete(id);
  }

  @UsePipes(ValidationPipe)
  @Put('update/:id')
  update(@Param('id') id: number, @Body() createUserDto: CreateUserDto) {
    return this.userService.update(id, createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('test')
  @ApiBearerAuth('access-token')
  test(@Body() createOrderDto: CreateOrderDto, @Req() req: any) {
    //console.log('req user',req.user);
    return this.userService.creatOrder(createOrderDto, req);
  }

  @Get(':userId')
  async findOrder(@Param('userId') userId: number) {
    return await this.userService.findOrderById(userId);
  }
}
