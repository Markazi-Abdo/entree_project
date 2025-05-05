import mongoose from "mongoose";

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
        required:true
    },
    dateOuverture:{
        type:Date,
        required:true
    },
    commune:{
        type:String,
        required:true
    }
})

const School = mongoose.model("School", schoolSchema);
export default School;