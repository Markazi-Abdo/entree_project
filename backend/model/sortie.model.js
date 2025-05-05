import mongoose from "mongoose";

const sortieSchema = new mongoose.Schema({
    articles:{
        type:Array,
        required:true
    },
    to:{
        type:String
    }
}, { timestamps:true })

const Sortie = mongoose.model("Sortie", sortieSchema);
export default Sortie;