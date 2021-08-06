import { getRepository } from "typeorm";

import User from "../../src/entities/User";
import Session from "../../src/entities/Sessions";
import UserPokemon from "../../src/entities/UserPokemon";

export async function clearDatabase () {
  await getRepository(Session).delete({});
  await getRepository(UserPokemon).delete({});
  await getRepository(User).delete({});
}
