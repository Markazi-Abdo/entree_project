import makeDocFile from "../downloads/dechargeSortie.js";
import makeEntreeFile from "../downloads/entreeDoc.js";
import { articleLogger } from "../logs/functions/article.log.js";
import { serverLogger } from "../logs/functions/server.log.js";
import History from "../model/historique.model.js";
import Article from "../model/produits.model.js";
import { serverNamespace } from "../src/index.js";

const entrees = {};
const createArticle = async function(req,res) {
    try {
        const { nom, quantite } = req.body;
        if (!nom || !quantite) {
            articleLogger.error("Les champs doivent etre remplis");
            return res.status(400).json({ success:false, message:"Les champs doivent etre remplis" });
        }

        const findArticle = await Article.findOne({ nom });
        if (findArticle) {
            findArticle.quantite = quantite;
            await findArticle.save();
            return res.status(200).json({ success:true, message:"Mise a jour du quantite" });
        }

        const newArticle = await Article.create({ nom, quantite });
        if (!newArticle) {
            articleLogger.error("Probleme survenu");
            return res.status(400).json({ success:false, message:"Probleme survenu" });
        }

        const newEntree = await History.create({ type:"Entree", article:newArticle._id });
        entrees[newArticle.id] = newArticle.nom;
        serverNamespace.emit("getEntrees", entrees);

        articleLogger.info("Article enregistrées");
        return res.status(201).json({ success:true, message:"Article enregistrées", newArticle });
    } catch (error) {
        serverLogger.error(`Èrreur:${error.message} dans ${error.message}`);
        return res.status(500).json({ success:false, message:error.message });
    }
}

export const downloadEntreeFile = async function(req, res) {
    try {
        const { article } = req.body;
        if (!article) {
            return res.status(400).json({ message:"Can't download no Data was given" });
        }

        const filePath = makeEntreeFile(article);
        return res.download(filePath, `entree-${article.nom}.docx`);
    } catch (error) {
        serverLogger.info(error.message)
        return res.status(500).json({ success:false, message:error.message })
    }
}

export const downloadSortieFile = function(req, res) {
    try {
        const { article } = req.body;
        if (!article) {
            return res.status(400).json({ success:false, message:"No data was given, couldn't proceed" });
        }

        const filePath = makeDocFile(article);
        return res.download(filePath, `${article.nom}_decharge_document.docx`, (error) => {
            if (error) console.log("Problem in download sortie file:" + error.message + " At: " + error.stack)
        });
    } catch (error) {
        serverLogger.info(error.message);
        return res.status(500).json({ success:false, message:error.message })
    }
}

const updateArticle = async function(req,res) {
    try {
        const { nom, quantite } = req.body;
        const { id:article } = req.params;

        if (!article) {
            return res.status(400).json({ success:false, message:"Parametre doit etre donné"});
        }
        if (!nom || !quantite) {
            articleLogger.error("Les champs doivent etre remplis");
            return res.status(400).json({ success:false, message:"Les champs doivent etre remplis" });
        }
        
        const findArticle = await Article.findByIdAndUpdate(article, { nom, quantite }, { new: true });
        if (!findArticle) {
            return res.status(404).json({ success:false, message:"article introuvable" });
        }
        entrees[article] = findArticle.nom;
        serverNamespace.emit("getEntrees", entrees);
        articleLogger.info("Article modifiés");
        return res.status(200).json({ success:true, message:"Article modifiés", article:findArticle });
    } catch (error) {
        serverLogger.error(`Èrreur:${error.message} dans ${error.message}`);
        return res.status(500).json({ success:false, message:error.message });
    }
}

const deleteArticle = async function(req,res) {
    try {
        const { id:article } = req.params;
        console.log(article);
        if (!article) {
            return res.status(404).json({ success:false, message:"Parametre n'est pas passé" });
        }

        const findArticle = await Article.findByIdAndDelete(article);
        const findInHistory = await History.findOne({ article });
        if (!findArticle) {
            articleLogger.error("Article introuvable");
            return res.status(404).json({ success:false, message:"Article introuvable" });
        }

        if (findInHistory) {
            await History.deleteOne({ article });
            delete entrees[article];
            serverNamespace.emit("getEntrees", entrees);
        }

        articleLogger.info("Article supprimé");
        return res.status(200).json({ success:true, message:"Article supprimés" });
    } catch (error) {
        serverLogger.error(`Èrreur:${error.message} dans ${error.message}`);
        return res.status(500).json({ success:false, message:error.message });
    }
}

const getArticles = async function(req,res) {
    try {
        const articles = await Article.find({});
        if (!articles) {
            articleLogger.error("Operations echoué");
            return res.status(400).json({ success:false, message:"Operations echoué" });
        }

        if (articles.length === 0) {
            articleLogger.error("Liste est vide")
            return res.status(200).json({ success:true, message:"Liste est vide", articles:[] });
        }

        articleLogger.info("Recuperées avec succes");
        return res.status(200).json({ success:true, message:"Recuperées avec succes", articles });
    } catch (error) {
        serverLogger.error(`Èrreur:${error.message} dans ${error.message}`);
        return res.status(500).json({ success:false, message:error.message });
    }
}

export { createArticle, updateArticle, deleteArticle, getArticles }