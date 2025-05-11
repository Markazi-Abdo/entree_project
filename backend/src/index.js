import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { serverLogger } from "../logs/functions/server.log.js";
import connectDatabase from "../config/database.js";
import User from "../model/user.model.js";
import Article from "../model/produits.model.js";
import History from "../model/historique.model.js";
import School from "../model/school.model.js";
import auth from "../routes/auth.routes.js";
import Sortie from "../model/sortie.model.js";
import articles from "../routes/articles.routes.js";
import histRoutes from "../routes/historique.routes.js";
import analytics from "../routes/analytics.routes.js";
import { Server } from "socket.io";
import http from "http";
import fs from "fs";
import schoolRoutes from "../routes/school.routes.js";
dotenv.config();

const app = express();
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(cookieParser());
app.use(express.json({ limit:"10mb" }));
app.use(express.urlencoded({ extended:true, limit:"10mb" }));

const server = http.createServer(app);
const telekenisis = new Server(server, { cors:
    {
        origin:"http://localhost:5173",
        credentials:true
    }
});

app.use("/niyaba/auth", auth);
app.use("/niyaba/articles", articles);
app.use("/niyaba/history", histRoutes);
app.use("/niyaba/analytics", analytics);
app.use("/niyaba/school", schoolRoutes);

export const serverNamespace = telekenisis.of("/niyaba");
const connectedUsers = {};

serverNamespace.on("connection", function(socket){
    serverLogger.info(`${socket.id} is connected`);
    const connectionId = socket.handshake.query.userId;

    if (connectionId) connectedUsers[connectionId] = socket.id;
    serverNamespace.emit("getUsers", Object.keys(connectedUsers));

    socket.on("disconnect", () => {
        serverLogger.info("User disconnected");
        delete connectedUsers[connectionId];
        serverNamespace.emit("getUsers", Object.keys(connectedUsers));
    })
})

server.listen(process.env.PORT, async function(){
    serverLogger.info("Server is running perfectly");
    await connectDatabase(process.env.DATABASE_URI)
    fs.writeFileSync("./server.txt", "Server IS wWorking right on port " + process.env.PORT, { encoding:"utf8" } );
})