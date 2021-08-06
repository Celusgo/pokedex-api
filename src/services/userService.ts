import { getRepository } from "typeorm";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import User from "../entities/User";
import Session from "../entities/Sessions";
import { userSchema } from "../schemas/userSchema";

export async function signUp (email: string, password: string, confirmPassword: string) {
  const information = userSchema.validate({
   email,
   password,
   confirmPassword
 })

 if (information.error) return false;

 await getRepository(User).insert({email, password: bcrypt.hashSync(password,12)});
 
 return true;
};

export async function findUserByEmail (email: string) {
  const trainer = await getRepository(User).findOne({
    where: { 
      email: email
    }
  });
  return trainer;
};

export async function signIn (id: number) {
  const token = uuid();
 
  await getRepository(Session).insert({trainerId: id, token});
  
  return token;
};

export async function checkIfPasswordsMatch (hashedPassword: string, password: string) {
 return bcrypt.compareSync(password, hashedPassword);
};