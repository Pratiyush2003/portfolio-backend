const mongoose = require('mongoose');
require('dotenv').config();

const connectdb = async() => {
    try {
        const connectdbs = await mongoose.connect(process.env.URL);
        if(connectdbs){
            console.log('database connected successfully')
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectdb;