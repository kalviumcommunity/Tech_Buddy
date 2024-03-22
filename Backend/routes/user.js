const express = require('express')

const router = express.Router()

const {signupUser,loginUser,logout, google,googlecallback} = require('../controllers/userController')


router.post('/signup',signupUser)

router.post("/login",loginUser)

router.get("/logout",logout)

router.get("/google",google)

router.get("/google/callback", googlecallback);

module.exports = router

