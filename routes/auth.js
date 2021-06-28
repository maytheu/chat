const express = require('express')
const router = express.Router()
const passport = require('passport')
const googleStrategy = require('passport-google-oauth20').Strategy
require("dotenv").config();

// passport.use(new googleStrategy)

router.get('/', (req, res)=>{
    res.send('testing auth')
})

module.exports=router