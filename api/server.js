const express = require('express');
const mongoose = require ('mongoose');
import userRoute from './routes/userRoute.js'
const app = express();
dotenv.config();




mongoose.set("strictQuery", true);


const connect = async()=>{
    try{
        mongoose.connect(process.env.MONGODB_URI)
        console.log('connected to db')
        }
    catch(err){
        res.status(500).send({message: err.message});
    }
};


app.use("api/user", userRoute);
app.listen(5656,()=>{console.log("backend server is running")})