const jwt = require('jsonwebtoken');
require('dotenv').config();  

exports.auth = (req, res, next) => {
    try{
        // console.log('cookies', req.cookies.token);
        // console.log('body', req.body.token);
        console.log('header', req.header('Authorization'));
        const token = req.body.token || req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');


    if(!token || token === undefined) {
        return res.status(401).json({
            message : "Unauthorized",
            success:false
        })     
    }
    //verfy the token
    try{
        const decode  = jwt.verify(token , process.env.JWT_SECRET);
        console.log("DECODE" , decode);
        req.user = decode ; 
        next(); 
    }catch(err){
        return res.status(401).json({
            success:false,
            message:"not token invalid"
        })
        
    }
    } catch(err){
        return res.status(401).json({
            success:false,
            message:'something went wrong'
        })

    }
     
}

exports.isStudent = (req , res , next) =>{
    try{
        if(req.user.role != 'Student'){
            return res.status(401).json({
                success:false, 
                message:" this is a protected route"
            })
        }
        next();
    }catch(err){
        req.status(500).json({
            success:false ,
            message:"ROle not match"
        })

    }
}

exports.isAdmin = (req , res , next) =>{
    try{
        if(req.user.role !="Admin"){
            return res.status(401).json({
                success:false, 
                message:" this is a protected route Admin"
            })
            
        }
        next();

    }catch{
        req.status(500).json({
            success:false ,
            message:"ROle not match"
        }) 
    }
}