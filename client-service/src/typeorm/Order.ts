import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
    @PrimaryGeneratedColumn({
      type: 'bigint',
    })
    id: number;

    @Column()
    from:string;

    @Column()
    to:string;

    @Column()
    amount: string;

    @Column()
    orderId: string;

    @Column()
    isSuccess: boolean;
}
