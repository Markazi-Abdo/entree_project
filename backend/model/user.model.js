import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    nom:{
        type:String,
        required:["true", "Nom est requis"]
    },
    email:{
        type:String,
        required:true
    },
    motPasse:{
        type:String,
        required:true
    },
    admin:{
        type:Boolean,
        default:true
    }
},{ timestamps:true })

const User = mongoose.model("User", userSchema);
export default User;