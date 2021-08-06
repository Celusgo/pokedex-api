import { Request, Response } from "express";

import * as userService from "../services/userService";

export async function signUp (req: Request, res: Response) {
  const { email, password, confirmPassword }: { email: string, password: string, confirmPassword: string }= req.body;
  if (!email || !password || !confirmPassword) return res.sendStatus(400);

  const checkingExistingEmail = await userService.findUserByEmail(email);
  if (checkingExistingEmail) return res.sendStatus(409);

  const request = await userService.signUp(email, password, confirmPassword);
  if (request === false) return res.sendStatus(400);

  res.sendStatus(201);
};

export async function singIn (req: Request, res: Response) {
  const { email, password }: { email: string; password: string } = req.body;
  if(!email || !password) return res.sendStatus(400);

  const checkExistingEmail = await userService.findUserByEmail(email);
  if(!checkExistingEmail) return res.sendStatus(400);

  const checkPassword = await userService.checkIfPasswordsMatch(checkExistingEmail.password, password);
  if(!checkPassword) return res.sendStatus(401);

  const token = await userService.signIn(checkExistingEmail.id);
  res.status(200).send({token});
};