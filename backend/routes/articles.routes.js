import express from "express";
import { createArticle, deleteArticle, getArticles, updateArticle } from "../controllers/article.controller.js";
import { checkAuth } from "../middleware/checkAuth.middleware.js";
import { checkAdmin } from "../middleware/checkAdmin.middleware.js";
const articles = express.Router();

articles.get("/all", checkAuth, checkAdmin, getArticles);
articles.post("/create", checkAuth, checkAdmin, createArticle);
articles.put("/update/:id", checkAuth, checkAdmin, updateArticle);
articles.delete("/delete/:id", checkAuth, checkAdmin, deleteArticle);

export default articles;