import express from "express";
import bodyParser from "body-parser";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

import placesRoute from "./routes/places-routes";
import usersRoute from "./routes/users-routes";
import HttpError from "./models/http-error";

const app = express();

app.use(bodyParser.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-with, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,POST, PATCH, DELETE");

  next();
});

app.use("/api/places", placesRoute); // => /api/places/...

app.use("/api/users", usersRoute);

app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new HttpError("Could not find this route.", 404);

  throw error;
});

// special middleware or error handling middleware bcz (4 parameter)
app.use((error: HttpError, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(error);
  }

  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred" });
});

mongoose
  .connect(`${process.env.DB_CONNECTION_STRING}`)
  .then(() => {
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((err) => console.log(err));
