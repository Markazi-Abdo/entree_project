import express from "express";
import { checkAuth } from "../middleware/checkAuth.middleware.js";
import { checkAdmin } from "../middleware/checkAdmin.middleware.js";
import { addSchool, removeSchool, updateSchool, getSchools, getInfo } from "../controllers/school.controller.js";
const schoolRoutes = express.Router();

schoolRoutes.post("/add", checkAuth, checkAdmin, addSchool);
schoolRoutes.put("/update/:codeGrise", checkAuth, checkAdmin, updateSchool);
schoolRoutes.delete("/remove/:codeGrise", checkAuth, checkAdmin, removeSchool);
schoolRoutes.get("/all", checkAuth, checkAdmin, getSchools);
schoolRoutes.get("/details/:codeGrise", checkAuth, checkAdmin, getInfo);

export default schoolRoutes;