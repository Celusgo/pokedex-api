import { Request, Response } from "express";
import * as pokemonServices from "../services/pokemonService";

export async function allPokemons(req: Request, res: Response){
    const id: number = res.locals.id;

    const pokemonList = await pokemonServices.listPokemons(id);
    res.send(pokemonList);
}