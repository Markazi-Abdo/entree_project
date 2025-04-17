import express from "express";
import { createSortie, deleteHistory, getHistory, getHistoryByType } from "../controllers/historique.controller.js";
const histRoutes = express.Router();

histRoutes.get("/all", getHistory);
histRoutes.get("/all/:type", getHistoryByType);
histRoutes.delete("/delete", deleteHistory);
histRoutes.post("/sortie", createSortie);

export default histRoutes;