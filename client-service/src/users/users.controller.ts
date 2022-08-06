import { CreateOrderDto } from '../dto/CreateOrder.dto';
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
} from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../dto/CreateUser.dto';
import { JwtAuthGuard } from '../Authen/jwt-auth.guard';


@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
  ) {}

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
  deleteUser(@Param() params) {
    return this.userService.delete(params.id);
  }

  @UsePipes(ValidationPipe)
  @Put('update/:id')
  update(@Param('id') id: number, @Body() createUserDto: CreateUserDto) {
    return this.userService.update(id, createUserDto);
  }
 
  @UseGuards(JwtAuthGuard)
  @Post('test')
  test( @Body() createOrderDto: CreateOrderDto){
     return this.userService.findAll(createOrderDto)
  }

}
