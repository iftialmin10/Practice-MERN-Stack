import express from "express";
import {
  createPlace,
  deletePlace,
  getPlaceById,
  getPlacesByUserId,
  updatePlace,
} from "../controllers/places-controller";

const router = express.Router();

router.get("/:pid", getPlaceById);

router.get("/user/:uid", getPlacesByUserId);

router.post("/", createPlace);

router.patch("/:pid", updatePlace);

router.delete("/:pid", deletePlace);

export default router;
