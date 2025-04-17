import mongoose from "mongoose";
const historySchema = new mongoose.Schema({
    type:{
        type:String,
        enum:["Entree", "Sortie"],
        required:true
    },
    article:{
        type:mongoose.Types.ObjectId,
        ref:"Article"
    }
}, { timestamps:true });

const History = mongoose.model("History", historySchema);
export default History;