import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import fs from "fs";
import { serverLogger } from "../logs/functions/server.log.js";

const makeEntreeFile = function(data) {
    const fileContent = fs.readFileSync("../backend/test/entree_test.docx", "binary");
    const zip = new PizZip(fileContent);

    const doc = new Docxtemplater(
        zip, {
            paragraphLoop:true,
            linebreaks:true
        }
    )

    try {
        doc.render({
            id:data._id,
            nom:data.nom,
            quantite:data.quantite
        })
    } catch (error) {
        console.log("Error in gen file entree");
    }

    const buf = doc.getZip().generate({
        type:"nodebuffer",
        compression:"DEFLATE"
    })

    const filePath = `../${data.nom}_entree_test.docx`;
    fs.writeFileSync(filePath, buf);
    serverLogger.info("Entree file generated");
    return filePath;
}

export default makeEntreeFile;