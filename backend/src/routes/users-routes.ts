import express from "express";
import { check } from "express-validator";

import { getUsers, login, signup } from "../controllers/users-controller";

const router = express.Router();

router.get("/", getUsers);

router.post("/login", login);

router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 8 }),
  ],
  signup
);

export default router;
