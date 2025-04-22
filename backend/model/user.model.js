import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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

userSchema.pre("save", async function(){
    if (!this.isModified("motPasse")) return;

    const salt = await bcrypt.genSalt(10);
    this.motPasse = await bcrypt.hash(this.motPasse, 10);
})

userSchema.methods.validatePassword = async function(password) {
    return await bcrypt.compare(password, this.motPasse);
}
const User = mongoose.model("User", userSchema);
export default User;