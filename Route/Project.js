const express = require("express");
const projects = require("../models/ProjectsSchema");
const projectsRouter = express.Router();

projectsRouter.post("/project" , async (req, res) => {
        const {name , image, github, hostlink} = req.body
        try {
            if(!name || !image || !github || !hostlink){
                res.status(500).json({error : "required all filled"});
            }
            
            const project = new projects({
                name,
                image,
                github,
                hostlink
            })
        
            const projectAdded = await project.save();
        
            if(projectAdded){
                res.status(200).json({mess : "skills added successfully"});
            }else{
                res.status(500).json({error : "failed to add"});
            }
        } catch (error) {
                res.status(500).json({error : error}); 
        }
})

module.exports = projectsRouter;