import { generateExcelEntree, generateExcelSortie } from "../downloads/excel.js";
import { serverLogger } from "../logs/functions/server.log.js";
import History from "../model/historique.model.js";
import Article from "../model/produits.model.js";
import School from "../model/school.model.js";
import Sortie from "../model/sortie.model.js";

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

const getSorties = async function(req, res) {
    try {
        const sorties = await Sortie.find({});

        if (!sorties) {
            return res.status(400).json({ success:false, message:"Couldn't get sorties" });
        }

        if (sorties.length === 0) {
            return res.status(200).json({ success:true, message:"Sorties list is empty", sorties });
        }

        return res.status(200).json({ success:true, message:"Succesfully", sorties });
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

const deleteEntreeHistory = async function(req, res) {
    try {
        await History.deleteMany({ type:"Entree" });
        return res.status(203);
    } catch (error) {
        return res.status(500).json({ success:false, message:error.message });
    }
}

const deleteSortieHistory = async function(req, res) {
    try {
        await History.deleteMany({ type:"Sortie" });
        return res.status(203);
    } catch (error) {
        return res.status(500).json({ success:false, message:error.message })
    }
}

const createSortie = async function(req, res) {
    try {
        const { sorties, to:codeGrise } = req.body;
        if (!Array.isArray(sorties) && !sorties) {
            return res.status(400).json({ success:false, message:"Format Invalid or empty array" })
        }

        if (!codeGrise) {
            return res.status(200).json({ success:false, message:"Recipient is important" });
        }

        const findTo = await School.findOne({ codeGrise });
        if (!findTo) {
            return res.status(400).json({ success:false, message:"School unregistered" });
        }
        
        const newSortie = await Sortie.create({ articles:sorties, to });
        sorties.forEach(async item => {
            const article = await Article.findById(item?.article?._id);
            article.quantite -= item?.quantite;
            await article.save(); 
        })

        return res.status(201).json({ success:true, message:"Sortie enregistré", newSortie });
    } catch (error) {
        serverLogger.error(`Èrreur:${error.message} dans ${error.message}`);
        return res.status(500).json({ success:false, message:error.message });
    }
}

const donwloadExcelFileEntree = async function(req, res) {
    try {
        const { data } = req.body;
        if (!data) {
            return res.status(400).json({ success:false, message:"No data was provided, couldn't generate excle sheet"});
        }

        const filePath = generateExcelEntree(data);
        return res.download(filePath, `entrees.xlsx`, (error) => {
            if (error) console.log(error.message);
        })
    } catch (error) {
        return res.status(500).json({ success:false, message:error.message })
    }
}

const donwloadExcelFileSortie = async function(req, res) {
    try {
        const { data } = req.body;
        if (!data) {
            return res.status(400).json({ success:false, message:"No data was provided, couldn't generate excle sheet"});
        }

        const filePath = generateExcelSortie(data);
        return res.download(filePath, `sorties.xlsx`, (error) => {
            if (error) console.log(error.message);
        })
    } catch (error) {
        return res.status(500).json({ success:false, message:error.message })
    }
}

export { getHistory, getHistoryByType, deleteHistory, createSortie, donwloadExcelFileEntree, donwloadExcelFileSortie, getSorties}