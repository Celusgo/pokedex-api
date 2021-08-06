import { Entity, PrimaryGeneratedColumn, Column, ManyToOne,  } from "typeorm";
import User from "./User";

@Entity("session")
export default class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @Column()
  userId: number;

  @ManyToOne(()=> User)
  user: User;
}