import { serverLogger } from "../logs/functions/server.log.js";
import History from "../model/historique.model.js";
import Article from "../model/produits.model.js";

const getHistory = async function(req, res){
    try {
        const histories = await History.find({});
        if (!histories) {
            return res.status(400).json({ success:false, message:"Pas de Historie" });
        }

        if (histories.length == 0) {
            return res.status(200).json({ success:true, message:"Pas de Historique" });
        }

        return res.status(200).json({ success:true, message:"Historique recupérée avec succes", histories });
    } catch (error) {
        serverLogger.error(`Èrreur:${error.message} dans ${error.message}`);
        return res.status(500).json({ success:false, message:error.message });
    }
}

const getHistoryByType = async function(req, res) {
    try {
        const { type } = req.params;
        if (!type) {
            return res.status(400).json({ success:false, message:"Le type n'est pas saisie" });
        }

        const history = await History.find({ type }).populate("article").sort({ createdAt:1 });
        if (!history) {
            return res.status(404).json({ success:false, message:"Couldn't find Type" });
        }

        if (history.length === 0) {
            return res.status(200).json({ success:true, message:"Historique de ce Type est vide" });
        }

        return res.status(200).json({ success:true, message:"Recuperée ce type avec succée", history });
    } catch (error) {
        serverLogger.error(`Èrreur:${error.message} dans ${error.message}`);
        return res.status(500).json({ success:false, message:error.message });
    }
}

const deleteHistory = async function(req, res) {
    try{
        await History.deleteMany({});
        return res.status(203);
    } catch(error) {
        serverLogger.error(`Èrreur:${error.message} dans ${error.message}`);
        return res.status(500).json({ success:false, message:error.message });
    }
}

const createSortie = async function(req, res) {
    try {
        const { article, number} = req.body;
        const findArticle = await Article.findById(article?._id);
        if (findArticle) {
            const sortie = await History.create({ type:"Sortie", article:article._id });
            findArticle.quantite -= number;
            findArticle.save();
            return res.status(200).json({ success:true, message:"Sortie est enregistrés", sortie });
        } else {
            return res.status(404).json({ success:false, message:"Article introuvable" });
        }
        
    } catch (error) {
        serverLogger.error(`Èrreur:${error.message} dans ${error.message}`);
        return res.status(500).json({ success:false, message:error.message });
    }
}

export { getHistory, getHistoryByType, deleteHistory, createSortie}