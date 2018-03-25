import express from "express";
import * as controller from "./user.controller.js";

export const router = express.Router();

// POST request API for /user
router.post('/login', controller.login);
router.post('/register', controller.register);