import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  to: number;

  @IsNotEmpty()
  amount: number;
}
