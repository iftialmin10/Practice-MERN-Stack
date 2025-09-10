import axios from "axios";
import * as dotenv from "dotenv";

import HttpError from "../models/http-error";

dotenv.config();

const API_KEY = process.env.API_KEY;

async function getCoordsForAddress(address: string) {
  const response = axios.get(
    `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
      address
    )}&key=${API_KEY}&language=en&pretty=1`
  );

  const data = (await response).data;

  if (!data || data.status === "ZERO RESULT") {
    const error = new HttpError(
      "Could not find location for the specified address",
      422
    );
    throw error;
  }

  const coordinates = data.results[0].geometry;

  return coordinates;
}

export default getCoordsForAddress;
