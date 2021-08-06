import { getRepository } from "typeorm";
import Pokemons from "../entities/Pokemons";
import UserPokemon from "../entities/UserPokemon";

interface AddUser extends Pokemons{
    inMyPokemons: boolean
}

export async function listPokemons(id: number){
    const userPokemons = await getRepository(UserPokemon).find({ 
        where: {
          trainerId: id 
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

export async function addUserPokemons(trainerId: number, pokemonId: number){
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
}

export async function removeUserPokemons(trainerId: number, pokemonId: number){
    const userPokemons = await getRepository(UserPokemon).find({ 
        where: {
          trainerId: trainerId,
          pokemonId: pokemonId
        }
    });

    const exists = userPokemons.find(n => n.pokemonId === pokemonId);

    if (!exists) return false;

    await getRepository(UserPokemon).delete({pokemonId: pokemonId})

    return true;
}