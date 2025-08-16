import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { validationResult } from "express-validator";

import HttpError from "../models/http-error";
import getCoordsForAddress from "../util/location";

type Place = {
  id: string;
  title: string;
  description: string;
  location: { lat: number; lng: number };
  address: string;
  creator: string;
};

let DUMMY_PLACES: Place[] = [
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

const getPlaceById = (req: Request, res: Response, next: NextFunction) => {
  const placeId = req.params.pid; //{pid:"p1"}
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });

  if (!place) {
    throw new HttpError("Could not find a place for the provider id.", 404);
  } else {
    res.json({ place }); // => {place} => {place: place}
  }
};

const getPlacesByUserId = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.uid;

  const places = DUMMY_PLACES.filter((p) => {
    return p.creator === userId;
  });

  if (!places || places.length === 0) {
    next(new HttpError("Could not find places for the provider user id.", 404));
  } else {
    res.json({ places });
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

  const createdPlace = {
    id: uuidv4(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };

  DUMMY_PLACES.push(createdPlace);

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

  const updatedPlace: Place = {
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
