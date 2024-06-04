const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    projectname : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    github : {
        type : String,
        required : true
    },
    hostlink : {
        type : String,
        required : true
    }
})
const projects = mongoose.model("project" , projectSchema);
module.exports = projects;