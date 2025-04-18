const mongoose =  require('mongoose');

require('dotenv').config();

exports.connect = ()=>{
   mongoose.connect(process.env.MONGODB_URI,{
   
   })
   .then(()=>{console.log("MongoDB connected successfully")})
   .catch((err)=>{
        console.log("MongoDB connection failed") 
        console.log(err)
        process.exit(1);
   })
   
}