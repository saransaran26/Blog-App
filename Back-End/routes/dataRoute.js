import mongoose from "mongoose";
import express from 'express'
import Data from "../models/data.js";
import multer from 'multer'
import { VerifyToken } from "../middlewave/auth.js";
import cloudinary from "../config/cloundinaryConfig.js";

const dataRoute = express.Router()

dataRoute.get('/',VerifyToken,async(req,res)=>{
    try {
        const data = await Data.find().populate('user')
        res.send({
            success:true,
            data:data
        })
    } catch (error) {
        console.log("error on route",error.message);
        res.send({
            success:false,
            message:error.message
        })
    }
})

dataRoute.get('/get-data/:id',async(req,res)=>{
    try {
        const response = await Data.findById(req.params.id).populate('user')
        res.send({
            success:true,
            data:response
        })
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        })
    }
})

dataRoute.get('/get-user-data',VerifyToken,async(req,res)=>{
   
    try {
        const response = await Data.find({user:req.body.userId}).populate('user')
        res.send({
            success:true,
            data:response
        })
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        })
    }
})

dataRoute.put('/edit/:id',VerifyToken,async(req,res)=>{
    const{name,des} = req.body
    try {
        const response = await Data.findByIdAndUpdate(req.params.id,{
            name,
            des
        })
        res.send({
            success:true,
            data:response
        })
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        })
    }
})






dataRoute.post('/postdata',VerifyToken,async(req,res)=>{
    
    const{user,name,des} = req.body
    try {
      
       const datas =await new Data({
        user,
        name,
        des,
       }).save()
       res.send({
        success:true,
        message:"Created successfully",
        data:datas
       })
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        })
    }
    
})


const storage = multer.diskStorage({
    filename:(req,file,cb)=>{
        cb(null,Date.now() + file.originalname)
    }
})
dataRoute.post('/upload',VerifyToken,multer({storage:storage}).single('file'),async(req,res)=>{
    
    try {
        const result = await cloudinary.uploader.upload(req.file.path,{
            folder:"task"
           })
           const productId = req.body.productId
           await Data.findByIdAndUpdate(productId,{
            $push:{image:result.secure_url}
           }) 
           res.send({
            success:true,
            message:"Created Successfully",
            data:result.secure_url
           })
    } catch (error) {
        console.log("error",error.message);
        res.send({
            success:false,
            message:error.message
        }) 
    }
})

dataRoute.post('/update-upload',VerifyToken,multer({storage:storage}).single('file'),async(req,res)=>{
    try {
        const result = await cloudinary.uploader.upload(req.file.path,{
            folder:"task"
           })
           const productId = req.body.id
           await Data.findByIdAndUpdate(productId,{
            $set:{image:result.secure_url}
           }) 
           res.send({
            success:true,
            message:"Updated Successfully",
            data:result.secure_url
           })
    } catch (error) {
        console.log("error",error.message);
        res.send({
            success:false,
            message:error.message
        }) 
    }
})

dataRoute.delete('/delete/:id',async(req,res)=>{
    try {
        const response = await Data.findByIdAndDelete(req.params.id)
        res.send({
            success:true,
            message:'Product Deleted successfully'
        })
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        }) 
    }
})

export default dataRoute