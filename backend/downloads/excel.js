import xlsx from "xlsx";

const generateExcelEntree = function(data) {
    const excelSheet = xlsx.utils.json_to_sheet(data);
    const workSpace = xlsx.utils.book_new();

    xlsx.utils.book_append_sheet(workSpace, excelSheet, "Entree");
    const filePath = "../backend/entree.xlsx";
    xlsx.writeFile(workSpace, filePath);
    return filePath;
}

const generateExcelSortie = function(data) {
    const excelSheet = xlsx.utils.json_to_sheet(data);
    const workSpace = xlsx.utils.book_new();

    xlsx.utils.book_append_sheet(workSpace, excelSheet, "Sortie");
    const filePath = "../backend/sorties.xlsx";
    xlsx.writeFile(workSpace, filePath);
    return filePath;
}

export { generateExcelEntree, generateExcelSortie };