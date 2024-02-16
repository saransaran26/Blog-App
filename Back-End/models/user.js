import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        requried:true
    },
    email:{
        type:String,
        requried:true,
        unique:true
    },
    password:{
        type:String,
        requried:true
    },
},{timestamps:true})

const User = mongoose.model('user',UserSchema)

export default User