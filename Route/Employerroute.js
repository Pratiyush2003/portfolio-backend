const express = require('express');
const EmployerRouter = express.Router();
const Employee = require('../models/EmployerSchema.js');


EmployerRouter.post("/employeer", async (req, res) => {
        const {name , emails} = req.body;
        if(!name || !emails){
           return res.status(500).send("Required both input")
        }
        if(!emails.includes("@")){
            return res.status(500).send("Enter a valid mail")
        }

    try {
        const employeerData = new Employee ({
            name,
            emails
        })

        const insertEmployeerData = await employeerData.save();
        if(insertEmployeerData){
            console.log(insertEmployeerData)
            return  res.status(200).json("Data has been sent.")
        }else{
            return res.status(500).json("Fail to inserdata");
        }
        
    } catch (error) {
        return res.status(500).json({message : error})
    }   
})

module.exports = EmployerRouter
