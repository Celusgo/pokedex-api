import { getRepository } from "typeorm";
import User from "../../src/entities/User";
import bcrypt from "bcrypt";

export function newTrainer (email: string|number , password: string|number, confirmPassword: string|number) {
  return({
    email,
    password,
    confirmPassword
  })
};

export async function insertTrainer (email: string, password: string) {
  await getRepository(User).insert({
    email: email,
    password: bcrypt.hashSync(password, 12)
  });
}
