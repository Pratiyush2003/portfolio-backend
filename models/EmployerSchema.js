const mongoose = require('mongoose');

const EmployerSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    emails : {
        type : String,
        required : true,
        unique : true
    }
})

const Employee = mongoose.model('employee' , EmployerSchema);
module.exports = Employee