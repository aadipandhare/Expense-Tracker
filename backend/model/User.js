import mongoose from "mongoose"
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    name :{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    profileImageUrl:{
        type: String,
        default: null

    }
})

//HashPassword before saving
// pre("save") → This is a pre-save hook in Mongoose.
// It runs before a document (user) is saved to MongoDB.

userSchema.pre("save",async function(){                          
    if(!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
})


//Compare password
userSchema.methods.comparePassword = async function (enterPassword){
    return await bcrypt.compare(enterPassword,this.password);
}
// async function comparePassword(enteredPassword, storedHash) {
//   const isMatch = await bcrypt.compare(enteredPassword, storedHash);
//   return isMatch;
// }

const userModel = mongoose.models.user || mongoose.model('user',userSchema);

export default userModel;   