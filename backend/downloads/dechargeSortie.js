import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import fs from "fs";
import { serverLogger } from "../logs/functions/server.log.js";

const makeDocFile = function(data) {
    const fileContent = fs.readFileSync("../backend/test/decharge_test.docx", "binary");
    const zipped = new PizZip(fileContent);

    const doc = new Docxtemplater(zipped, {
        paragraphLoop:true,
        linebreaks:true
    });

    const transformedData = data.map(dt => {
        return {
            id:dt?.article?._id || " ",
            nom:dt?.article?.nom,
            quantite:dt?.quantite
        }
    })

    try {
        doc.render({
            articles:transformedData
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


