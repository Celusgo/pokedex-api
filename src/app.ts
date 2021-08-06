import "./setup";

import express from "express";
import cors from "cors";
import "reflect-metadata";
import axios from "axios";
import { getRepository } from "typeorm";
import Pokemon from "./entities/Pokemons";
import connectDatabase from "./database";

import * as userController from "./controllers/userConroller";

const app = express();
app.use(cors());
app.use(express.json());

/*app.use("/populate", async (req,res)=>{
 
  for(let i = 1; i < 200; i ++){
    const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
    const newPokemon = {
      name: result.data.name,
      number: result.data.id,
      image: result.data.sprites.front_default,
      weight: result.data.weight,
      height: result.data.height,
      baseExp: result.data.base_experience,
      description: ""
    }
 
    const speciesResult = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${i}`)
    newPokemon.description = speciesResult.data.flavor_text_entries[0].flavor_text.split("\n").join(" ")
    const pokemon = getRepository(Pokemon).create(newPokemon)
    const resultquery = await getRepository(Pokemon).save(pokemon)
  }
  res.send("OK")
})*/

app.get("/sign-up", userController.signUp);

export async function init () {
  await connectDatabase();
}

export default app;
