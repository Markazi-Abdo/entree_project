import express from "express";
import { checkAuth } from "../middleware/checkAuth.middleware.js";
import { checkAdmin } from "../middleware/checkAdmin.middleware.js";
import { getData } from "../controllers/analytics.controller.js";
const analytics = express.Router();

analytics.get("/data", checkAuth, checkAdmin, getData);

export default analytics;