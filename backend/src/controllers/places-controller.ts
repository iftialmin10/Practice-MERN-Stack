import { Request, Response, NextFunction } from "express";

import HttpError from "../models/http-error";

const DUMMY_PLACES = [
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

export const getPlaceById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

export const getPlaceByUserId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.uid;

  const place = DUMMY_PLACES.find((p) => {
    return p.creator === userId;
  });

  if (!place) {
    next(
      new HttpError("Could not find a place for the provider user id.", 404)
    );
  } else {
    res.json({ place });
  }
};
