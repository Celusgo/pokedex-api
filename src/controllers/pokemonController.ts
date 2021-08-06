import { Request, Response } from "express";
import * as pokemonServices from "../services/pokemonService";

export async function getAllPokemons(req: Request, res: Response){
    const trainerId: number = res.locals.id;

    const pokemonList = await pokemonServices.listPokemons(trainerId);
    
    res.status(200).send(pokemonList);
};

export async function addToMyPokemons(req: Request, res: Response){
    const trainerId: number = res.locals.id;
    const pokemonId = req.params.id;

    const findPokemon = await pokemonServices.addToList(trainerId, parseInt(pokemonId));
    if (findPokemon === false) return res.sendStatus(401);

    res.sendStatus(200);
};

export async function RemoveFromMyPokemons(req: Request, res: Response){
    const trainerId: number = res.locals.id;
    const pokemonId = req.params.id;

    const findPokemon = await pokemonServices.removeFromList(trainerId, parseInt(pokemonId));
    if (findPokemon === false) return res.sendStatus(401);
    
    res.sendStatus(200);
};