import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity("trainer_pokemon")
export default class UserPokemon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  trainerId: number;

  @Column()
  pokemonId: number;
}