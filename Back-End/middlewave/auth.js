import jwt from 'jsonwebtoken'

export const VerifyToken = (req,res,next)=>{
    //console.log("req",req.header);
    try {
        const token = req.header('authorization').split(" ")[1]
        const decode = jwt.verify(token,"GUVI@")
        req.body.userId = decode.id
        
        next() 
    } catch (error) {
        
        res.send({
            success:false,
            message:error.message
        })
    }
}
