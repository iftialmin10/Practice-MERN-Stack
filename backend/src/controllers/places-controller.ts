import fs from "fs";

import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import mongoose from "mongoose";

import HttpError from "../models/http-error";
import getCoordsForAddress from "../util/location";
import Place, { IPlace } from "../models/place";
import User from "../models/user";

const getPlaceById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const placeId = req.params.pid;

  let place;

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
  res.json({ place: place.toObject({ getters: true }) });
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

  let userWithPlaces;

  try {
    userWithPlaces = await User.findById(userId).populate<{
      places: (IPlace & mongoose.Document)[];
    }>("places");
  } catch (err) {
    return next(
      new HttpError("Fetching places failed, please try again later.", 500)
    );
  }

  if (!userWithPlaces || userWithPlaces.places.length === 0) {
    return next(
      new HttpError("Could not find places for the provided user id.", 404)
    );
  } else {
    res.json({
      places: userWithPlaces.places.map((place) =>
        place.toObject({ getters: true })
      ),
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
  }: {
    title: string;
    description: string;
    address: string;
  } = req.body;

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
    image: req.file?.path,
    creator: req.userData?.userId,
  });

  let user;
  try {
    user = await User.findById(req.userData!.userId);
  } catch (err) {
    const error = new HttpError("Creating place failed, please try again", 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Could not find user for provided id", 404);
    return next(error);
  }

  console.log(user);

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPlace.save({ session: sess });
    user.places.push(createdPlace._id as mongoose.Types.ObjectId);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Creating place failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(201).json({ place: createdPlace });
};

const updatePlace = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const {
    title,
    description,
  }: {
    title: string;
    description: string;
  } = req.body;

  const placeId = req.params.pid;

  let place;

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
    return next(new HttpError("Place not found", 404));
  }

  if (place.creator.toString() !== req.userData!.userId) {
    const error = new HttpError("You are not allowed to edit this place.", 401);
    return next(error);
  }
  place.title = title;
  place.description = description;

  try {
    await place.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update place",
      500
    );
    return next(error);
  }

  res.status(200).json({ place: place.toObject({ getters: true }) });
};

const deletePlace = async (req: Request, res: Response, next: NextFunction) => {
  const placeId = req.params.pid;

  if (!placeId || !mongoose.Types.ObjectId.isValid(placeId)) {
    return next(new HttpError("Invalid place ID format.", 400));
  }

  let place;
  try {
    place = await Place.findById(placeId).populate("creator");
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find place",
      500
    );
    return next(error);
  }

  if (!place) {
    return next(new HttpError("Could not find place for this id", 404));
  }

  if (place.creator.toString() !== req.userData!.userId) {
    const error = new HttpError(
      "You are not allowed to delete this place.",
      401
    );
    return next(error);
  }

  const imagePath = place.image;

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();

    await place.deleteOne({ session: sess });

    const user = await User.findById(place.creator);
    if (!user) {
      await sess.abortTransaction();
      return next(new HttpError("User not found", 404));
    }

    user.places = user.places.filter((pid) => pid.toString() !== placeId);
    await user.save({ session: sess });

    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete place",
      500
    );
    return next(error);
  }
  fs.unlink(imagePath, (err) => {
    console.log(err);
  });

  res.status(200).json({ message: "Deleted place." });
};

export {
  getPlacesByUserId,
  getPlaceById,
  createPlace,
  deletePlace,
  updatePlace,
};
