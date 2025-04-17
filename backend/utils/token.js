import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { redis } from "../config/redis.js";
dotenv.config();

export const addToken = async function(userId, res){
    const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_KEY, { expiresIn:"15d" });
    await redis.set(`access_token_${userId}`, accessToken, "EX", 15*24*60*60);
    res.cookie("access_token", accessToken, {
        maxAge:15 * 24 * 60 * 60 * 1000,
        httpOnly:true
    });
}