import express from "express";
import * as controller from "./count.controller.js";

export const router = express.Router();

// Create last layer of API call so a POST request to /api/count/start
// will run the "start" function the controller
router.get("/:id", controller.get);
router.post("/start", controller.start);
router.post("/:id/:count", controller.update);
router.delete("/:id", controller.remove);