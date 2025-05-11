import mongoose, { Types } from "mongoose";

const schoolSchema = new mongoose.Schema({
    nom:{
        type:String,
        required:true
    },
    codeGrise:{
        type:String,
        required:true,
        unique:true
    },
    siecle:{
        type:String,
    },
    dateOuverture:{
        type:Date,
    },
    commune:{
        type:String,
    },
    type:{
        type:String,
        enum:["Prive", "Public"],
    },
    sorties:[{
        type:mongoose.Types.ObjectId,
        ref:"Sortie"
    }]
}, { timestamps:true })

const School = mongoose.model("School", schoolSchema);
export default School;