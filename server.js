const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const routes = require('./routes/api')
const mongoose = require('mongoose')
const path = require("path")

const connectDB = require("./config/db")
const Invoice = require('./models/Invoice')

dotenv.config({ path: './config/config.env' })

connectDB();
const app = express();


app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.use(morgan('tiny'))

app.use('/api', routes)

//Serve static file if in production 

if(process.env.NODE_ENV === "production"){
    //set static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) =>{
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
}


const PORT = process.env.PORT || 8080

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow))