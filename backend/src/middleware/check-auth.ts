import { Request, Response, NextFunction } from "express";
import HttpError from "../models/http-error";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_KEY as string;
if (!jwtSecret) {
  throw new Error("JWT_KEY is not defined in the environment variables.");
}

export default (req: Request, res: Response, next: NextFunction) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new Error("Authentication failed! No token provided.");
    }
    const decodedToken = jwt.verify(token, jwtSecret);

    if (typeof decodedToken !== "string") {
      if ("userId" in decodedToken) {
        req.userData = { userId: decodedToken.userId };
        next();
      } else {
        throw new Error("Invalid token: missing userId.");
      }
    } else {
      throw new Error("Invalid token format.");
    }

    next();
  } catch (err) {
    const error = new HttpError(
      "Authentication failed! No token provided.",
      403
    );
    return next(error);
  }
};
