import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import Pokemons from "./Pokemons";

@Entity("trainer_pokemon")
export default class UserPokemon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  trainerId: number;

  @Column()
  pokemonId: number;
}