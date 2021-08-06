import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import Pokemons from "./Pokemons";

@Entity("user_pokemon")
export default class UserPokemon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  pokemonId: number;
}