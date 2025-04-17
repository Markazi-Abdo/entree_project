import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
    nom:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    }
}, { timestamps:true })

const Article = mongoose.model("Article", articleSchema);
export default Article;