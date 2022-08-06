import { Exclude } from 'class-transformer';

export interface User {
  id:number,
  username: string;
  password: string;
  email:string;
  address:string;
}

export class SerializedUser {
  id:number;
  username: string;
  email:string;
  address:string;
  
  @Exclude() // loại bỏ password
  password: string;

  constructor(partial: Partial<SerializedUser>) {
    Object.assign(this, partial); // sao chép giá trị và thuộc tính từ 1 or nhiều ob nguồn -> đích
  }
}
