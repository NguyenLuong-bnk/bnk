import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './Order';
@Entity()
export class User {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({
    unique: true,
  })
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @Column()
  balance: number;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
