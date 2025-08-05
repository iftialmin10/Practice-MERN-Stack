import express from "express";

const router = express.Router();

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

router.get("/:uid", (req, res, next) => {
  const userId = req.params.uid;
  const user = DUMMY_PLACES.find((u) => {
    return u.creator === userId;
  });

  res.json({ user });
});

export default router;
