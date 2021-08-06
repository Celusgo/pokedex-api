
import { getRepository } from 'typeorm';
import { v4 as uuid} from 'uuid';
import User from '../../src/entities/User';
import Session from '../../src/entities/Sessions';
import { insertTrainer } from './userFactory';
import UserPokemon from '../../src/entities/UserPokemon';

export async function createNewSessionWithToken() {
    const token = uuid();

    await insertTrainer("validemail", "validpassword");

    const user = await getRepository(User).findOne({
            where: {
                email: 'validemail'
            }
        }
    );

    await getRepository(Session).insert({
        trainerId: user.id,
        token: token
    });

    return token;
};

export async function findRelation(){
    const relation = await getRepository(UserPokemon).find();
    return relation;
}