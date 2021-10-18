import { Entity, PrimaryGeneratedColumn, Column, ManyToOne,  } from "typeorm";

@Entity("session")
export default class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @Column()
  trainerId: number;
}