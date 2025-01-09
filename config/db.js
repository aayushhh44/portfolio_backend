const { mongoose } = require("mongoose");

const dotenv = require('dotenv');
dotenv.config();

const URL = process.env.DB_CONNECTION_STRING 

const mongoConnect = mongoose.connect(URL,{
    socketTimeoutMS: 30000,
    serverSelectionTimeoutMS:30000
}).then(() => console.log('Mongodb connected')).catch((err)=>console.log("Mongodb error occurred", err))


module.exports = mongoConnect
