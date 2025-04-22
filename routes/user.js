const express = require('express');
const router = express.Router();

const {login , signup} = require('../controllers/Auth')
const {auth , isStudent ,isAdmin} = require('../middlewares/auth')

 router.post('/login',login);
router.post('/signup', signup); // ✅ Correct


router.get('/test', auth , (res , req ) => {
    res.status(200).json({message : "Welcome to the test route"})
})

//protected routes
router.get('/student', auth , isStudent , (res , req ) => {
    res.status(200).json({message : "Welcome Student"})
})

router.get('/admin',auth , isAdmin,(req,res) => {
   res.status(200).jason({
    message : "Welcome Admin"
   }) 
})
module.exports = router; 