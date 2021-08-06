  
import { getRepository } from "typeorm";
import Session from "../entities/Sessions";

export async function checkSession(token: string) {
    const receivedToken = await getRepository(Session).findOne({
        where: { 
          token: token
        }
      });
      return receivedToken;
}