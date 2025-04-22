import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
    nom:{
        type:String,
        required:true
    },
    quantite:{
        type:Number,
        required:true
    }
}, { timestamps:true })

const Article = mongoose.model("Article", articleSchema);
export default Article;