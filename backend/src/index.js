import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { serverLogger } from "../logs/functions/server.log.js";
import connectDatabase from "../config/database.js";
import User from "../model/user.model.js";
import Article from "../model/produits.model.js";
import History from "../model/historique.model.js";
import auth from "../routes/auth.routes.js";
import articles from "../routes/articles.routes.js";
import histRoutes from "../routes/historique.routes.js";
import analytics from "../routes/analytics.routes.js";
dotenv.config();
const app = express();

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(cookieParser());
app.use(express.json({ limit:"10mb" }));
app.use(express.urlencoded({ extended:true, limit:"10mb" }));

app.use("/niyaba/auth", auth);
app.use("/niyaba/articles", articles);
app.use("/niyaba/history", histRoutes);
app.use("/niyaba/analytics", analytics);

app.listen(process.env.PORT, async function(){
    serverLogger.info("Server is running perfectly");
    await connectDatabase(process.env.DATABASE_URI)
})