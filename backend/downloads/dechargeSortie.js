import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import fs from "fs";
import { serverLogger } from "../logs/functions/server.log.js";
import path from "path";
import { fileURLToPath } from "url";

const makeDocFile = function(data) {
    const fileContent = fs.readFileSync("../backend/test/decharge_test.docx", "binary");
    const zipped = new PizZip(fileContent);

    const doc = new Docxtemplater(zipped, {
        paragraphLoop:true,
        linebreaks:true
    });

    try {
        doc.render({
            id:data._id,
            nom:data.nom,
            quantite:data.quantite
        });
    } catch (error) {
        console.error("Error in file creation: " + error.message)
    }

    const buf = doc.getZip().generate({
        type:"nodebuffer",
        compression:"DEFLATE"
    })

    const filePath = `../${data.nom}_decharge_document.docx`;
    fs.writeFileSync(filePath, buf);
    serverLogger.info("New word file generated");
    return filePath;
}

export default makeDocFile;


