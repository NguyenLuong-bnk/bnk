import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn({
       type: 'bigint',     
    })
    id:number;

    @Column( )
    username:string;

    @Column( )
    password:  string;

    @Column( )
    email:  string;

    @Column( )
    address:  string;
}

