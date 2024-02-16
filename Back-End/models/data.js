import mongoose from "mongoose";


const DataSchema = new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:'user',
        required:true
    },
    name:{
        type:String,
        required:true
    },
    des:{
        type:String,
        required:true
    },
    image:{
        type:Array,
        default:[],
        required:true
    },
},{timestamps:true})

const Data = mongoose.model('data',DataSchema)

export default Data