import { serverLogger } from "../logs/functions/server.log.js"
import School from "../model/school.model.js";
import Sortie from "../model/school.model.js"

const validateBody = function(object) {
    const pattern = /^[A-Z][0-9]{6}$/;
    if (!Object.values(object).every(item => item && item.trim !== "")) {
        return false;
    }

    if (!pattern.test(object.codeGrise)) {
        return false;
    }

    return true;
}

const addSchool = async function(req, res) {
    try {
        const { nom, codeGrise, commune, siecle } = req.body;
        const isValid = validateBody({ nom, codeGrise, commune, siecle });

        if (isValid) {
            const isExist = await School.findOne({ codeGrise:req.body.codeGrise });
            if (isExist) {
                return res.status(400).json({ success:false, message:"Une ecole existe avec le meme code grise" });
            }

            const newSchool = await School.create({ nom, codeGrise, commune, siecle });
            return res.status(201).json({ success:true, message:"Ecole enregistré", newSchool });
        } else {
            return res.status(400).json({ success:false, message:"Un erreur est survenu lors de la création de cette ecole verifier les donness enregistrer" });
        }

    } catch(error) {
        serverLogger.errror(error.message);
        return res.status(500).json({ success:false, message:error.message })
    }
}

const updateSchool = async function(req, res) {
    try {
        const { codeGrise:ecole } = req.params;
        const { nom, codeGrise, commune, siecle } = req.body;
        const isValid = validateBody({ nom, codeGrise, commune, siecle });

        if (isValid) {
            const school = await School.findOneAndUpdate({ codeGrise:ecole }, { nom, codeGrise, commune, siecle }, { new:true });
            if (!school) {
                return res.status(404).json({ success:false, message:"Ecole inconnue" })
            }

            return res.status(200).json({ success:true, message:"Ecole modefié", school });
        } else {
            return res.status(400).json({ success:false, message:"Un probleme est survenue lors de la mise à jour" });
        }
    } catch (error) {
        serverLogger.error(error.message);
        return res.status(500).json({ success:false, message:error.message })
    }
}

const getSchools = async function(req, res) {
    try {
        const schools = await School.find().sort({ createdAt:-1 }).populate("sorties");

        if (!schools) {
            return res.status(404).json({ success:false, message:"Récupération échoué" });
        }

        if (schools.length === 0) {
            return res.status(203);
        }

        return res.status(200).json({ success:true, message:"Récupération avec success", schools });
    } catch (error) {
        serverLogger.errror(error.message);
        return res.status(500).json({ success:false, message:error.message })
    }
}

const removeSchool = async function(req, res) {
    try {
        const { codeGrise } = req.params;
        console.log(codeGrise);
        if (!codeGrise) {
            return res.status(400).json({ success:false, message:"Aucun info est donné pour la suppression" });
        }

        const school = await School.findOneAndDelete(codeGrise);
        if (!school) {
            return res.status(404).json({ success:false, message:"Ecole introuvable" });
        }

        return res.status(200).json({ success:true, message:"Ecole supprimées" });
    } catch (error) {
        serverLogger.errror(error.message);
        return res.status(500).json({ success:false, message:error.message })
    }
}

const getInfo = async function(req, res) {
    try {
        const { codeGrise } = req.params;
        if (!codeGrise) {
            return res.status(400).json({ success:false, message:"No code grise was given" });
        }

        const details = await School.findOne({ codeGrise });
        
        if (!details) {
            return res.status(404).json({ success:false, message:"Ecole inconnue" });
        }

        const sorties = details.sorties; 
       
        return res.status(200).json({ success:true, message:"Details retenu", sorties });
    } catch (error) {
        serverLogger.errror(error.message);
        return res.status(500).json({ success:false, message:error.message })
    }
}

export { addSchool, updateSchool, removeSchool, getSchools, getInfo }