const mongoose = require('mongoose');

const SkillsSchema = new mongoose.Schema({
    link : {
        type : String,
        required : true
    },
    nameofSkill : {
        type : String,
        required : true
    }
})
const skill = mongoose.model("Skills" , SkillsSchema);
module.exports = skill;