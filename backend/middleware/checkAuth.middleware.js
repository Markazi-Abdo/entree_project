import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../model/user.model.js";
import { serverLogger } from "../logs/functions/server.log.js";
dotenv.config();

export const checkAuth = async function(req, res, next){
    try {
        const token = req.cookies.access_token;
        if (!token) {
            return res.status(404).json({ success:false, message:"Token n'est pas intriuvable" });
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
        if (!decodedToken) {
            return res.status(400).json({ success:false, message:"Token invalid" });
        }

        const findUser = await User.findById(decodedToken.userId).select("-motPasse");
        if (!findUser) {
            return res.status(404).json({ success:false, message:"Utilisateuer introuvable" });
        }

        req.user = findUser;
        next();
    } catch (error) {
        serverLogger.error(`Èrreur:${error.message} dans ${error.message}`);
        return res.status(500).json({ success:false, message:error.message });
    }
}