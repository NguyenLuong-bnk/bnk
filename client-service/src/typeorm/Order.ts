import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Order {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column()
  userToId: number;

  @Column()
  userId: number;

  @Column()
  amount: number;

  @Column()
  orderId: string;

  @Column()
  isSuccess: boolean;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;
}
