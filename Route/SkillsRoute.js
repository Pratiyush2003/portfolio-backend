const express = require("express");
const Skill = require("../models/SkillsSchema.js");
const Project = require("../models/ProjectsSchema.js");
const router = express.Router();

// Route to add a new skill
router.post("/skill", async (req, res) => {
  const { link, nameofSkill } = req.body;
  try {
    if (!link || !nameofSkill) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newSkill = new Skill({ link, nameofSkill });
    const addedSkill = await newSkill.save();

    if (addedSkill) {
      return res.status(200).json({ message: "Skill added successfully" });
    } else {
      return res.status(500).json({ error: "Failed to add skill" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
});

router.get("/skill", async (req, res) => {
  try {
    const data = await Skill.find();
    res.status(200).json(data);
    if (!data) {
      res.status(500).json({ error: "no skills found" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/project", async (req, res) => {
  try {
    const data = await Project.find();
    res.status(200).json(data);
    if (!data) {
      res.status(500).json({ error: "no skills found" });
    }
  } catch (error) {
    console.log(error);
  }
});

// Route to add a new project
router.post("/project", async (req, res) => {
  const { projectname, image, github, hostlink } = req.body;
  try {
    if (!projectname || !image || !github || !hostlink) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newProject = new Project({ projectname, image, github, hostlink });
    const addedProject = await newProject.save();

    if (addedProject) {
      return res.status(200).json({ message: "Project added successfully" });
    } else {
      return res.status(500).json({ error: "Failed to add project" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
