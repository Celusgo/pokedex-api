import { Request, Response } from "express";
import * as pokemonServices from "../services/pokemonService";

export async function getAllPokemons(req: Request, res: Response){
    const id: number = res.locals.id;

    const pokemonList = await pokemonServices.listPokemons(id);
    res.send(pokemonList);
};

export async function addToMyPokemons(req: Request, res: Response){
    const trainerId: number = res.locals.id;
    const pokemonId = req.params.id;

    await pokemonServices.addUserPokemons(trainerId, parseInt(pokemonId));
    res.sendStatus(200);
};

export async function RemoveFromMyPokemons(req: Request, res: Response){
    const trainerId: number = res.locals.id;
    const pokemonId = req.params.id;

    const findPokemon = await pokemonServices.removeUserPokemons(trainerId, parseInt(pokemonId));
    if(!findPokemon) return res.sendStatus(401);
    
    res.sendStatus(200);
};