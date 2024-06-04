const express = require('express');
const authentication = express.Router();
const userModel = require('../models/SignupSchema')
const fetchUser = require('../Route/Getuser')
const jwt = require('jsonwebtoken')
require('dotenv').config();
const bcrypt = require('bcrypt')

authentication.post('/signup', async(req, res) => {
    const { email, password} = req.body 
  
    // hash the password 
    const hashedpassword = await bcrypt.hash(password, 10); 
    
    const newUser =  new userModel({
      email,
      password: hashedpassword
    })
  
    const userCreated = await newUser.save()
    if(!userCreated) {
      console.log("user cannot be created");
      return res.status(500).send("user cannot be created")
    } else {
      console.log("user has been created to the database");
      return res.status(200).send("user has been created to the database")
    }
  });

authentication.post('/login', async(req, res) => {
    const { email, password } = req.body;
  
    const user = await userModel.findOne({ email });
  
    if (!user) {
      return res.status(401).send('Invalid email or password');
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
  
    if (!isPasswordCorrect) {
      return res.status(401).send('Invalid email or password');
    }
  
    const mysecretkey = process.env.SECRET_CODE;
  
    const payload = {
      email: user.email,
      password: user.password,
    };

    const token = jwt.sign(payload, mysecretkey, { expiresIn: '5d' });
    res.status(200).json({
      msg: "User is logged in",
      token: token
    });
});

authentication.post('/getuser', fetchUser, async (req, res) => {
    try {
        const userId = req.userId
        console.log("getuser Id", userId)
        const user = await userModel.findById(userId).select("-password")
        res.send(user)
        console.log("getuser", user)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error");
    }
})


module.exports = authentication