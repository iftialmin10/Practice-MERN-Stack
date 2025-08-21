import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { validationResult } from "express-validator";

import HttpError from "../models/http-error";
import User from "../models/user";

interface IUser {
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

const DUMMY_USERS: IUser[] = [
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

const signup = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { name, email, password, places } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Signing up failed, Please try later", 500);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError("User already exists", 422);
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    image: "https://example.com/image.png",
    password,
    places: [], // Initialize with empty places array
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError("Signing up failed, please try again.", 500);
    return next(error);
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
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
