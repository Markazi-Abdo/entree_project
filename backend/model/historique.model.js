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
    },
    sorties:{
        type:Array
    }
    ,
    by:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    to:{
        type:mongoose.Types.ObjectId,
        ref:"School"
    }
}, { timestamps:true });

const History = mongoose.model("History", historySchema);
export default History;