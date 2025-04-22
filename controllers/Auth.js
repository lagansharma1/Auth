const bcrypt = require("bcrypt");
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();
// Signup
exports.signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check for existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists", 
                success: false
            });
        }

        // Secure password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
            
        } catch (err) {
            return res.status(500).json({
                message: "Hashing password failed",
                success: false
            });
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        return res.status(200).json({
            success: true,
            message: "User created successfully"
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};


exports.login = async (req,res)=>{
    try{
        const {email,password}= req.body;
      
        if(!email || !password){
            return res.status(400).json({
                message: "Please provide email and password",
                success: false
            });
        }
        let user = await User.findOne({email}); 
        if(!user){
            return res.status(400).json({
                success:false,
                message: "User not found"
            })
        }
        const payload = {
            email: user.email,
            id: user._id,
            role: user.role
        }
        //Compare password
      if( await bcrypt.compare(password,user.password)){
        let token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "2h"
        });
        
        user = user.toObject(); // Convert Mongoose document to plain object
        user.token = token; // Add token to user object

        user.password = undefined;
        const option = {
            expires: new Date(Date.now() + 3*24*60*60*1000),
            httpOnly: true

        }
        res.cookie("lagan", token , option).status(200).json({
            success: true,
            message: "Login successful",
            user,
            token 
        })
      }
      else{
        return res.status(400).json({
            success: false,
            message: "Invalid password"
        })
      }
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            message:"Internal server error",
            success: false
        })

    }
    
    
}