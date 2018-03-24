import express from "express";
import * as controller from "./book.controller.js";

export const router = express.Router();

// Create last layer of API call so a POST request to /api/count/start
// will run the "start" function the controller
router.get("/:id", controller.getById);
router.get("/rating/:rating", controller.getByRating);
router.get("/authors/all", controller.getAllAuthors);

router.post("/", controller.add);
router.post("/update/rating/", controller.updateRating);

router.delete("/:id", controller.remove);
