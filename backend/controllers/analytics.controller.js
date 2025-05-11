import Article from "../model/produits.model.js";
import History from "../model/historique.model.js";
import User from "../model/user.model.js";
import { serverLogger } from "../logs/functions/server.log.js";
import Sortie from "../model/sortie.model.js";

const getAnalytics = async function() {
    try {
        const [ users, articles, entree, sortie ] = await Promise.all([
            User.countDocuments(),
            Article.countDocuments(),
            History.find({ type:"Entree" }).countDocuments(),
            Sortie.countDocuments()
        ])

        return {
            data:{ 
            users, 
            articles, 
            histoires: { entree, sortie } 
        }};
    } catch (error) {
        serverLogger.error(`Èrreur:${error.message} dans ${error.message}`);
        return error.message + error.stack;
    }
}

const getDaysInRange = function(startDate, endDate) {
    const dates = [];
    const currentDate = new Date(startDate);

    while (endDate >= currentDate) {
        dates.push(currentDate.toISOString().split("T")[0]);
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
}

const getMonthsInRange = function() {
    const months = [];
    const endMonth = 12;
    let cuurentMonth = new Date().getMonth();

    for (let i = 0; i < 12; i++) {
        if (cuurentMonth >= 12) {
            cuurentMonth = 1;
            months.push(cuurentMonth);
        }
        months.push(cuurentMonth + 1);
        cuurentMonth += 1;
    }

    return months;    
}

const getMonthlyEntreeHistory = async function(startMonth, endMonth) {
    try {
        
    } catch (error) {
        throw new error;
    }
}

const getDailyEntreeHistory = async function(startDate, endDate) {
    try {
        const historyData = await History.aggregate([
            {
                $match:{
                    type:"Entree",
                    createdAt:{
                        $gte:startDate,
                        $lte:endDate
                    }
                }
            },
            {
                $group:{
                    _id: {$dateToString:{ format:"%Y-%m-%d", date:"$createdAt" }},
                    count: { $sum:1 }
                }
            },
            {
                $sort:{
                    _id:1
                }
            }
        ]) 

        const dates = getDaysInRange(startDate, endDate);
        const result = dates.map(date => {
            const foundDate = historyData.find(item => item._id === date);

            return{
                date,
                history:foundDate ? foundDate.count : 0
            } 
        })

        return result;
    } catch (error) {
        throw error;
    }
}

const getDailySortieHistory = async function(startDate, endDate) {
    try {
        const sortieHistory = await Sortie.aggregate([
            {
                $match:{
                    createdAt:{
                        $gte:startDate,
                        $lte:endDate
                    }
                }
            },
            {
                $group:{
                    _id:{ $dateToString:{ format:"%Y-%m-%d", date:"$createdAt" }},
                    count:{ $sum:1 }
                }
            },
            {
                $sort:{
                    _id:1
                }
            }
        ])

        const dates = getDaysInRange(startDate, endDate);
        const result = dates.map(date => {
            const foundItem = sortieHistory.find(item => item._id === date)

            return{
                date,
                history:foundItem ? foundItem.count : 0
            }
        })

        return result;
    } catch (error) {
        throw error
    }
}

const getData = async function(req, res) {
    try {
        const analytics = await getAnalytics();

        const endDate = new Date();
        const startDate = new Date(endDate - 7 * 24 * 60 * 60 * 1000);

        const entreeAnalytics = await getDailyEntreeHistory(startDate, endDate);
        const sortieAnalytics = await getDailySortieHistory(startDate, endDate);

        return res.status(200).json({ 
            success:true, 
            message:"Données recupérée pour admin", 
            data:{ analytics, entreeAnalytics, sortieAnalytics }
        });
    } catch (error) {
        serverLogger.error(`Èrreur:${error.message} dans ${error.stack}`);
        return res.status(500).json({ success:false, message:error.message });
    }
}
export { getData }