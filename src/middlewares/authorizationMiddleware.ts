import { Request, Response, NextFunction } from "express";
import * as authorizationService from "../services/authorizationService"

export async function checkToken(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization;

    if (!authorization) return res.sendStatus(401);

    const token = authorization.split("Bearer ")[1];

    const validSession = await authorizationService.checkSession(token);
    if (!validSession) {
      return res.sendStatus(401);
    }
    else{
      res.locals.id = validSession.userId;  
      next();
    }
  }