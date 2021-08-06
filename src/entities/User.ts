import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("user")
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;
}
