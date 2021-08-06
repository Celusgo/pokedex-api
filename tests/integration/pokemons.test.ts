import supertest from "supertest";
import { getConnection } from "typeorm";

import app, { init } from "../../src/app";
import { createNewSessionWithToken, findRelation } from "../factories/pokemonFactory";
import { clearDatabase } from "../utils/database";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await getConnection().close();
});

const agent = supertest(app);

describe("GET /pokemons", () => {
  
    it("returns status 200 for valid token and also returns the length of the body", async () => {

        const token = await createNewSessionWithToken();

        const response = await agent.get("/pokemons").set('Authorization', `Bearer ${token}`);
        
        expect(response.status).toEqual(200);

        expect(response.body.length).toBe(898);
    });

    it("returns status 401 for invalid token", async () => {

        const token = await createNewSessionWithToken();

        const response = await agent.get("/pokemons").set('Authorization', `Bearer differentToken`);
        
        expect(response.status).toEqual(401);

    });

});

describe("POST /my-pokemons/:id/add", () => {
  
    it("returns status 200 for valid token and correct length before and after adding pokemon to trainer's list", async () => {

        const token = await createNewSessionWithToken();

        const before = await findRelation();

        const response = await agent.post("/my-pokemons/1/add").set('Authorization', `Bearer ${token}`);

        const after = await findRelation();
        
        expect(response.status).toEqual(200);
        expect(before.length).toEqual(0);
        expect(after.length).toEqual(1);

    });

    it("returns status 401 for invalid token", async () => {

        const token = await createNewSessionWithToken();

        const response = await agent.post("/my-pokemons/1/add").set('Authorization', `Bearer differentToken`);
        
        expect(response.status).toEqual(401);

    });

    it("returns status 401 if user tries to add the same pokemon to the list", async () => {

        const token = await createNewSessionWithToken();

        const firstAdd = await agent.post("/my-pokemons/1/add").set('Authorization', `Bearer ${token}`);

        const before = await findRelation();

        const secondAdd = await agent.post("/my-pokemons/1/add").set('Authorization', `Bearer ${token}`);

        const after = await findRelation();
        
        expect(firstAdd.status).toEqual(200);
        expect(before.length).toEqual(1);
        expect(secondAdd.status).toEqual(401);
        expect(after.length).toEqual(1);

    });

});

describe("POST /my-pokemons/:id/remove", () => {

    it("returns status 200 for valid token and correct length before and after removing pokemon from trainer's list", async () => {

        const token = await createNewSessionWithToken();

        const add = await agent.post("/my-pokemons/1/add").set('Authorization', `Bearer ${token}`);

        const before = await findRelation();

        const remove = await agent.post("/my-pokemons/1/remove").set('Authorization', `Bearer ${token}`);

        const after = await findRelation();
        
        expect(add.status).toEqual(200);
        expect(before.length).toEqual(1);
        expect(remove.status).toEqual(200);
        expect(after.length).toEqual(0);

    });

    it("returns status 401 for invalid token", async () => {

        const token = await createNewSessionWithToken();

        const response = await agent.post("/my-pokemons/1/remove").set('Authorization', `Bearer differentToken`);
        
        expect(response.status).toEqual(401);

    });

    it("returns status 401 if user tries to remove a pokemon that is not on the list", async () => {

        const token = await createNewSessionWithToken();

        const response = await agent.post("/my-pokemons/1/remove").set('Authorization', `Bearer ${token}`);
        
        expect(response.status).toEqual(401);
        
    });

});

