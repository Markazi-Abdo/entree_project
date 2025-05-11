import mongoose from "mongoose";

const sortieSchema = new mongoose.Schema({
    articles:{
        type:Array,
        required:true
    },
    to:{
        type:Object
    }
}, { timestamps:true })

const Sortie = mongoose.model("Sortie", sortieSchema);
export default Sortie;