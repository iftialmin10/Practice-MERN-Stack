import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { validationResult } from "express-validator";
import mongoose from "mongoose";

import HttpError from "../models/http-error";
import getCoordsForAddress from "../util/location";
import { Place } from "../models/place";

// Local dummy-place shape (rename to avoid colliding with the Mongoose `Place` model)
type DummyPlace = {
  id: string;
  title: string;
  description: string;
  location: { lat: number; lng: number };
  address: string;
  creator: string;
};

let DUMMY_PLACES: DummyPlace[] = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    location: {
      lat: 40.7484405,
      lng: -73.9882393,
    },
    address: "20 W 34th St., New York, NY 10001, United States",
    creator: "u1",
  },
];

const getPlaceById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const placeId = req.params.pid;

  let place;

  // Check if provided ID is valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(placeId!)) {
    const error = new HttpError("Invalid place ID format.", 400);
    return next(error);
  }

  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a place",
      500
    );
    return next(error);
  }

  if (!place) {
    const error = new HttpError(
      "Could not find a place for the provider id.",
      404
    );
    return next(error);
  }
  res.json({ place: place.toObject({ getters: true }) }); // => {place} => {place: place}
};

const getPlacesByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.uid;

  if (!userId) {
    return next(new HttpError("User ID is required.", 400));
  }

  let places;

  try {
    places = await Place.find({ creator: userId });
  } catch (err) {
    return next(
      new HttpError("Fetching places failed, please try again later.", 500)
    );
  }

  if (!places || places.length === 0) {
    return next(
      new HttpError("Could not find places for the provided user id.", 404)
    );
  } else {
    res.json({
      places: places.map((place) => place.toObject({ getters: true })),
    });
  }
};

const createPlace = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const {
    title,
    description,
    address,
    creator,
  }: {
    title: string;
    description: string;
    address: string;
    creator: string;
  } = req.body;
  // const title = req.body.title

  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  const createdPlace = new Place({
    title,
    description,
    location: coordinates,
    address,
    image:
      "https://media.architecturaldigest.com/photos/66b397865c4b67e0f3a7d9ac/16:9/w_960,c_limit/GettyImages-584714362.jpg",
    creator,
  });

  try {
    await createdPlace.save();
  } catch (err) {
    const error = new HttpError(
      "Creating place failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(201).json({ place: createdPlace });
};

const updatePlace = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const {
    title,
    description,
  }: {
    title: string;
    description: string;
  } = req.body;

  const placeId = req.params.pid;

  const foundPlace = DUMMY_PLACES.find((p) => p.id === placeId);

  if (!foundPlace) {
    return next(new HttpError("Place not found", 404));
  }

  const updatedPlace: DummyPlace = {
    ...foundPlace,
    title,
    description,
  };
  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);

  DUMMY_PLACES[placeIndex] = updatedPlace;

  res.status(200).json({ place: updatedPlace });
};

const deletePlace = (req: Request, res: Response, next: NextFunction) => {
  const placeId = req.params.pid;

  if (!DUMMY_PLACES.find((p) => p.id === placeId)) {
    throw new HttpError("Could not find a place for that id.", 404);
  }

  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);
  res.status(200).json({ message: "Deleted place." });
};

export {
  getPlacesByUserId,
  getPlaceById,
  createPlace,
  deletePlace,
  updatePlace,
};
