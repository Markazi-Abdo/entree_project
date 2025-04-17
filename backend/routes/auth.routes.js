import express from "express";
import { logInUser, logOutUser, profileCheck, signUpUser } from "../controllers/auth.controller.js";
import { checkAuth } from "../middleware/checkAuth.middleware.js";
const auth = express.Router();

auth.post("/signup", signUpUser);
auth.post("/login", logInUser);
auth.post("/logout", logOutUser);
auth.get("/profilecheck", checkAuth, profileCheck);

export default auth;