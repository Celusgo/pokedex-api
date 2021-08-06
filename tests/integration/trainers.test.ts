import supertest from "supertest";
import { getConnection } from "typeorm";

import app, { init } from "../../src/app";
import { newTrainer, insertTrainer } from "../factories/userFactory";
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

describe("POST /sign-up", () => {
  
  it("returns status 201 for valid params", async () => {

    const body = newTrainer('validmail@gmail.com', 'validpassword', 'validpassword');

    const response = await agent.post("/sign-up").send(body);
    
    expect(response.status).toEqual(201);
  });

  it("returns status 400 for empty params", async () => {

    const response = await agent.post("/sign-up").send({});
    
    expect(response.status).toEqual(400);
  });

  it("returns status 400 for empty email", async () => {

    const body = newTrainer('', 'validpassword', 'validpassword');

    const response = await agent.post("/sign-up").send(body);
    
    expect(response.status).toEqual(400);
  });

  it("returns status 400 for wrong format email", async () => {

    const body = newTrainer('invalidmail', 'validpassword', 'validpassword');

    const response = await agent.post("/sign-up").send(body);
    
    expect(response.status).toEqual(400);
  });

  it("returns status 400 if email is not a string", async () => {

    const body = newTrainer(3, 'validpassword', 'validpassword');

    const response = await agent.post("/sign-up").send(body);
    
    expect(response.status).toEqual(400);
  });

  it("returns status 400 for empty password", async () => {

    const body = newTrainer('validmail@gmail.com', '', '');

    const response = await agent.post("/sign-up").send(body);
    
    expect(response.status).toEqual(400);
  });

  it("returns status 400 if password is not a string", async () => {

    const body = newTrainer('validmail@gmail.com', 3, 3);

    const response = await agent.post("/sign-up").send(body);
    
    expect(response.status).toEqual(400);
  });

  it("returns status 400 if password and confirmPassword are not equal", async () => {

    const body = newTrainer('validmail@gmail.com', 'enteredpassword', 'confirmationpassword');

    const response = await agent.post("/sign-up").send(body);
    
    expect(response.status).toEqual(400);
  });

  it("returns status 409 if the email is already registered", async () => {

    const body = newTrainer('validmail@gmail.com', 'validpassword', 'validpassword');

    const create = await agent.post("/sign-up").send(body);
    const repeat = await agent.post("/sign-up").send(body);
    
    expect(create.status).toEqual(201);
    expect(repeat.status).toEqual(409);
  });

});

describe("POST /sign-in", () => {

  it("returns status 200 for valid params and also returns the user token", async () => {

    const insert = {
      email: "validmail@gmail.com",
      password: "validpassword",
    }
    await insertTrainer(insert.email, insert.password);

    const body = {
      email: insert.email,
      password: insert.password,
    }

    const response = await agent.post("/sign-in").send(body);
    
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expect.objectContaining({token: response.body.token}));
  });

  it("returns status 400 for empty params", async () => {

    const response = await agent.post("/sign-in").send({});
    
    expect(response.status).toEqual(400);
  });

  it("returns status 400 if email is not registered", async () => {

    const insert = {
      email: "validmail@gmail.com",
      password: "validpassword",
    }
    await insertTrainer(insert.email, insert.password);

    const body = {
      email: "differentmail",
      password: insert.password,
    }

    const response = await agent.post("/sign-in").send(body);
    
    expect(response.status).toEqual(400);
  });

  it("should answer with status 401 for invalid password", async () => {
  
    const insert = {
      email: "validmail@gmail.com",
      password: "validpassword",
    }
    await insertTrainer(insert.email, insert.password);

    const body = {
      email: insert.email,
      password: "differentpassword",
    }

    const response = await agent.post("/sign-in").send(body);
    
    expect(response.status).toEqual(401);
  });

});

