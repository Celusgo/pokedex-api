import "./setup";

import express from "express";
import cors from "cors";
import "reflect-metadata";
import connectDatabase from "./database";

import { Request, Response, NextFunction } from "express";
import * as userController from "./controllers/userConroller";
import * as pokemonController from "./controllers/pokemonController";
import { checkToken } from "./middlewares/authorizationMiddleware";


const app = express();
app.use(cors());
app.use(express.json());
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.sendStatus(500);
});

import axios from "axios";
import { getRepository } from "typeorm";
import Pokemon from "./entities/Pokemons";

app.get("/populate", async (req,res)=>{
  console.log("Entrou")
  for(let i = 1; i <= 898; i ++){
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
    for (let j = 0; j < speciesResult.data.flavor_text_entries.length; j++) {
      if(speciesResult.data.flavor_text_entries[j].language.name === "en"){
        newPokemon.description =  speciesResult.data.flavor_text_entries[j].flavor_text.split("\n").join(" ")
      }
    }
    await getRepository(Pokemon).insert(newPokemon);
  }
  res.send("OK");
})

app.post("/sign-up", userController.signUp);
app.post("/sign-in", userController.singIn);
app.get("/pokemons", checkToken, pokemonController.getAllPokemons);
app.post("/my-pokemons/:id/add", checkToken, pokemonController.addToMyPokemons);
app.post("/my-pokemons/:id/remove", checkToken, pokemonController.RemoveFromMyPokemons);

export async function init () {
  await connectDatabase();
}

export default app;
