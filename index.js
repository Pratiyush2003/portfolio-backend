const express = require('express');
const connectdbs = require('./db.js')
const bodyParser = require('body-parser')
require('dotenv').config();
const cors = require('cors');
const EmployerRouter = require('./Route/Employerroute.js');
const router = require('./Route/SkillsRoute.js')
const authentication = require('.Route/Registerrroute.js')

const app = express();
const port  = process.env.PORT || 4000;
app.use(cors());
app.use(bodyParser.json());

connectdbs();

app.get("/", (req, res) => {
    res.send("hello world");
})

app.use("/employee" , EmployerRouter);
app.use("/skill" , router);
app.use("/register" , authentication)


app.listen(port, () => {
    console.log(`localhost:${port}`);
})
