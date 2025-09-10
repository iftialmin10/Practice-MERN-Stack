import fs from "fs";
import path from "path";

import express from "express";
import bodyParser from "body-parser";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

import placesRoute from "./routes/places-routes";
import usersRoute from "./routes/users-routes";
import HttpError from "./models/http-error";

const app = express();

app.use(bodyParser.json());

app.use("/uploads/images", express.static(path.join("uploads", "images")));

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-with, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,POST, PATCH, DELETE");

  next();
});

app.use("/api/places", placesRoute);

app.use("/api/users", usersRoute);

app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new HttpError("Could not find this route.", 404);

  throw error;
});

app.use((error: HttpError, req: Request, res: Response, next: NextFunction) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }

  if (res.headersSent) {
    return next(error);
  }

  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred" });
});

console.log(process.env.DB_NAME);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.hi8lrtj.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((err) => console.log(err));
