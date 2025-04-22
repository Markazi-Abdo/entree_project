import { authLogger } from "../logs/functions/auth.log.js";
import { dataLogger } from "../logs/functions/data.log.js";
import { serverLogger } from "../logs/functions/server.log.js";
import User from "../model/user.model.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { addToken } from "../utils/token.js";
import { redis } from "../config/redis.js";
dotenv.config();

const validateSignUpUser = async function({ nom, email, motPasse }, res) {
    if ( ![nom, email, motPasse].every(value => value?.trim() !== "") ) {
        dataLogger.error(`Enregistrement echoué d'utilisateur`);
        authLogger.error(`Enregistrement echoué d'utilisateur`);
        res.status(400).json({ success:false, message:"Tous les champs doivent etre remplis"});
        return false;
    }

    if (motPasse?.length < 6) {
        dataLogger.info("L'utilisateur n'a pas pu être créé car son mot de passe est inférieur à la longueur minimale requise");
        authLogger.error(`Enregistrement echoué d'utilisateur`);
        res.status(400).json({ success:false, message:"Le mot de passe doit être plus long", code:"Short"});
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\s])[A-Za-z\d@$!%*?&/]{8,}$/;
    if (!emailRegex.test(email) || !passwordRegex.test(motPasse)) {
        dataLogger.info("L'utilisateur n'a pas pu être créé car il n'a pas respecté le format des champs obligatoires");
        authLogger.error(`Enregistrement echoué d'utilisateur`);
        res.status(400).json({ success:false, message:"Format de l'email ou du mot de passe incorrect", code:"Format" });
        return false;
    }

    const isExisting = await User.findOne({ email });
    if (isExisting) {
        dataLogger.info("L'utilisateur n'a pas pu être créé car il un utilisateur du meme info existe");
        authLogger.error(`Enregistrement echoué d'utilisateur`);
        res.status(400).json({ success:false, message:"Format de l'email ou du mot de passe incorrect", code:"Already exists" });
        return false;
    }
    return true;
}

const validateLogInUser = function({ email, motPasse }, res) {
    if ( ![ email, motPasse].every(value => value?.trim() !== "") ) {
        dataLogger.error(`Enregistrement echoué d'utilisateur`);
        authLogger.error(`Enregistrement echoué d'utilisateur`);
        res.status(400).json({ success:false, message:"Tous les champs doivent etre remplis"});
        return false;
    }

    if (motPasse?.length < 6) {
        dataLogger.info("L'utilisateur n'a pas pu être créé car son mot de passe est inférieur à la longueur minimale requise");
        authLogger.error(`Enregistrement echoué d'utilisateur`);
        res.status(400).json({ success:false, message:"Le mot de passe doit être plus long", code:"Short"});
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\s])[A-Za-z\d@$!%*?&/]{8,}$/;
    if (!emailRegex.test(email) || !passwordRegex.test(motPasse)) {
        dataLogger.info("L'utilisateur n'a pas pu être créé car il n'a pas respecté le format des champs obligatoires");
        authLogger.error(`Enregistrement echoué d'utilisateur`);
        res.status(400).json({ success:false, message:"Format de l'email ou du mot de passe incorrect", code:"Format" });
        return false;
    }

    return true;
}

const signUpUser = async function(req, res) {
    try {
        const { nom, email, motPasse } = req.body;
        const isValid = await validateSignUpUser({ nom, email, motPasse }, res);
        if (isValid) {
            const newUser = await User.create({ nom, email, motPasse });
            if (!newUser) {
                return res.status(400).json({ success:false, message:"Erreur" });
            }
    
            dataLogger.info(`${nom} enregistrés avec success`);
            authLogger.info(`${nom} enregistrés avec success`);
            await addToken(newUser._id, res);
            return res.status(200).json({ success:true, message:`${nom} enregistrés avec success`}, newUser);
        }
    } catch (error) {
        serverLogger.error(`Erreur:${error.message} dans ${error.stack}`)
        return res.status(500).json({ success:false, message:error.message});
    }
}

const logInUser = async function(req, res) {
    try {
        const { email, motPasse } = req.body;
        const isValid = validateLogInUser({ email, motPasse }, res)
        if (isValid) {
            const findUser = await User.findOne({ email });
            const compare = await findUser.validatePassword(motPasse);
            if (!findUser || !compare) {
                authLogger.error("Utilisateur non reconnue");
                return res.status(404).json({ success:false, message:"Utilisateur non reconneu" });
            }

            await addToken(findUser._id, res);
            authLogger.info("Coonection etabli avec succeé");
            return res.status(200).json({ success:true, message:"Utilisateur connecté avec succeé", user:findUser });
        }
    } catch (error) {
        serverLogger.error(`Èrreur:${error.message} dans ${error.message}`);
        return res.status(500).json({ success:false, message:error.message });
    }
}

const logOutUser = async function(req, res) {
    try {
        const cookie = req.cookies.access_token;
        if (!cookie) {
            return res.status(404).json({ success:false, message:"Token introuvable" });
        }

        const decoded = jwt.verify(cookie, process.env.ACCESS_TOKEN_KEY);
        if (!decoded) {
            return res.status(404).json({ success:false, message:"Token invalide" });
        }

        await redis.del(`access_token_${decoded.userId}`);
        res.clearCookie("access_token");

        return res.status(200).json({ sucees:true, message:"User logged Out succesfully" });
    } catch (error) {
        serverLogger.error(`Èrreur:${error.message} dans ${error.message}`);
        return res.status(500).json({ success:false, message:error.message });
    }
}

const profileCheck = async function(req, res){
    try {
        if (!req.user) {
            return res.status(404).json({ success:false, message:"Utilisateur introuvable" });
        }
        return res.json({ user:req.user });
    } catch (error) {
        serverLogger.error(`Èrreur:${error.message} dans ${error.message}`);
        return res.status(500).json({ success:false, message:error.message });
    }
}

export { signUpUser, logInUser, logOutUser, profileCheck };
