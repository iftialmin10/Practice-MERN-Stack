import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { validationResult } from "express-validator";

import HttpError from "../models/http-error";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

interface SignupBody {
  name: string;
  email: string;
  password: string;
}

interface LoginBody {
  email: string;
  password: string;
}

const DUMMY_USERS: User[] = [
  {
    id: "u1",
    name: "IFTI",
    email: "test@test.com",
    password: "testers",
  },
];

const getUsers = (req: Request, res: Response, next: NextFunction) => {
  res.json({ users: DUMMY_USERS });
};

const signup = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const { name, email, password } = req.body;

  const hasUser = DUMMY_USERS.find((u) => u.email === email);

  const createdUser = {
    id: uuidv4(),
    name,
    email,
    password,
  };

  if (!hasUser) {
    DUMMY_USERS.push(createdUser);
    res.status(201).json({ user: createdUser });
  } else {
    res.status(401).json({ message: "User already exist" });
  }
};

const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find((u) => u.email === email);

  if (!identifiedUser || identifiedUser.password !== password) {
    next(new HttpError("Could not match with credential.", 401));
  } else {
    res.json({ message: "Logged in!" });
  }
};

export { getUsers, signup, login };
