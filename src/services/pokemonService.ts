import { getRepository } from "typeorm";
import Pokemons from "../entities/Pokemons";
import UserPokemon from "../entities/UserPokemon";

interface PokeBoolean extends Pokemons {
    inMyPokemons?: boolean
};

export async function listPokemons(trainerId: number){
    const userPokemons: UserPokemon[] = await getRepository(UserPokemon).find({ 
        where: {
          trainerId: trainerId 
        }
      });

    const allPokemons: PokeBoolean[] = await getRepository(Pokemons).find();
    for(let i = 0; i < allPokemons.length; i++){
        if(userPokemons.length === 0){
            allPokemons[i].inMyPokemons = false;
        }
        else{
            allPokemons[i].inMyPokemons = false;
            for(let j = 0; j < userPokemons.length; j++){
                if(userPokemons[j].pokemonId === allPokemons[i].id){
                    allPokemons[i].inMyPokemons = true;
                }
            }
        }
    }
    return allPokemons;
};

export async function addToList(trainerId: number, pokemonId: number){
    const userPokemons = await getRepository(UserPokemon).find({ 
        where: {
          trainerId: trainerId,
          pokemonId: pokemonId
        }
    });

    const exists = userPokemons.find(item => item.pokemonId === pokemonId);

    if (exists) return false;

    await getRepository(UserPokemon).insert({
        trainerId: trainerId,
        pokemonId: pokemonId
    });

    return true;
};

export async function removeFromList(trainerId: number, pokemonId: number){
    const userPokemons = await getRepository(UserPokemon).find({ 
        where: {
          trainerId: trainerId,
          pokemonId: pokemonId
        }
    });

    const exists = userPokemons.find(item => item.pokemonId === pokemonId);

    if (!exists) return false;

    await getRepository(UserPokemon).delete({pokemonId: pokemonId})

    return true;
};