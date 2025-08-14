import express from "express";
import {
  createPlace,
  deletePlace,
  getPlaceById,
  getPlaceByUserId,
  updatePlace,
} from "../controllers/places-controller";

const router = express.Router();

router.get("/:pid", getPlaceById);

router.get("/user/:uid", getPlaceByUserId);

router.post("/", createPlace);

router.patch("/:pid", updatePlace);

router.delete("/:pid", deletePlace);

export default router;
