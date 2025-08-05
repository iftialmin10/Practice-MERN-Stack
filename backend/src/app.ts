import express from "express";
import bodyParser from "body-parser";
import type { Request, Response } from "express";

import placesRoute from "./routes/places-routes";
import userRoute from "./routes/users-routes";

const app = express();

app.use("/api/places", placesRoute); // => /api/places/...

app.use("/api/users", userRoute); // => /api/users/...

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
