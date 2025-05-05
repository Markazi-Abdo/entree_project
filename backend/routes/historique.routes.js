import express from "express";
import { createSortie, deleteHistory, donwloadExcelFileEntree, donwloadExcelFileSortie, getHistory, getHistoryByType, getSorties } from "../controllers/historique.controller.js";
const histRoutes = express.Router();

histRoutes.get("/all", getHistory);
histRoutes.get("/all/:type", getHistoryByType);
histRoutes.get("/allsorties", getSorties);
histRoutes.delete("/delete", deleteHistory);
histRoutes.post("/sortie", createSortie);

histRoutes.post("/donwload_excel_entree", donwloadExcelFileEntree);
histRoutes.post("/donwload_excel_sortie", donwloadExcelFileSortie);

export default histRoutes;