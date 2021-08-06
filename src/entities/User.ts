import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("trainer")
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;
}
