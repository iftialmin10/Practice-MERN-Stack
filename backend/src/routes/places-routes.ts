import express from "express";
import {
  getPlaceById,
  getPlaceByUserId,
} from "../controllers/places-controller";

const router = express.Router();

router.get("/:pid", getPlaceById);

router.get("/user/:uid", getPlaceByUserId);

export default router;
