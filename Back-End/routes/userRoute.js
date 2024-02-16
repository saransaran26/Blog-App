import express from 'express'
import bcrypt from 'bcrypt'
import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import { VerifyToken } from '../middlewave/auth.js'

const userRoute = express.Router()

userRoute.post('/register',async(req,res)=>{
    const {name,email,password} = req.body
    try {
        const user = await User.findOne({email})
        if(user){
            return res.send({
                success:false,
                message:"Email ID Already Registered"
            })
        }
        const hashedpassword = await bcrypt.hash(password,10)
        const newUser = await new User({
            name,
            email,
            password:hashedpassword
        }).save()
        res.send({
            success:true,
            message:"User Registered Successfully"
        })
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        })
    }
})

userRoute.post('/login',async(req,res)=>{
    const{email,password} = req.body
    try {
        const user = await User.findOne({email})
        if(!user){
            return res.send({
                message:"User not yet Registered",
                success:false
            })
        }
        const comparepassword = await bcrypt.compare(password,user.password)
        if(!comparepassword){
            return res.send({
                message:"Invalid password",
                success:false
            })
        }
        const token = jwt.sign({id:user._id},"GUVI@",{expiresIn:"1h"})
        res.send({
            success:true,
            message:"Login succesfully",
            data:token
        })
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        })
    }   
})

userRoute.get('/get-current-user',VerifyToken,async(req,res)=>{
    try {
       const response = await User.findById(req.body.userId) 
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

export default userRoute