import express from "express";
import bodyParser from "body-parser";
import { Request, Response, NextFunction } from "express";

import placesRoute from "./routes/places-routes";
// import userRoute from "./routes/users-routes";
import HttpError from "./models/http-error";

const app = express();

app.use("/api/places", placesRoute); // => /api/places/...

// special middleware or error handling middleware bcz (4 parameter)
app.use((error: HttpError, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(error);
  }

  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured" });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
