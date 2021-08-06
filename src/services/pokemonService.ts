import { getRepository } from "typeorm";
import Pokemons from "../entities/Pokemons";
import UserPokemon from "../entities/UserPokemon";

interface AddUser extends Pokemons{
    inMyPokemons: boolean
}

export async function listPokemons(id: number){
    const userPokemons = await getRepository(UserPokemon).find({ 
        where: {
          userId: id 
        }
      });
    let pokemons: any[] = await getRepository(Pokemons).find();

    for(let i = 0; i < pokemons.length; i++){
        if(!userPokemons[0]){
            pokemons[i].inMyPokemons = false;
        }
        else{
            const pokemonId = pokemons[i].id;
            for(let j = 0; j < userPokemons.length; j++){
                if(userPokemons[j].pokemonId === pokemonId){
                    pokemons[i].inMyPokemons = true;
                }
                else{
                    pokemons[i].inMyPokemons = false;
                }
            }
        }
    }
    return pokemons;
}