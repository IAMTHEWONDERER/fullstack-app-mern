const express = require('express');
const mongoose = require ('mongoose');




import cookieParser from 'cookie-parser';
import gigRoute from './routes/gigRoute.js';
import authRoute from './routes/authRoute.js';
import userRoute from './routes/userRoute.js';
import orderRoute from './routes/orderRoute.js';
import reviewRoute from './routes/reviewRoute.js';
import messageRoute from './routes/messageRoute.js';
import conversationRoute from './routes/conversationRoute.js';




dotenv.config();
const app = express();
const dotenv = require('dotenv');




app.use(express.json());
app.use(cookieParser())



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

app.use("api/auth", authRoute);
app.use("api/users", userRoute);
app.use("api/gigs", gigRoute);
app.use("api/orders", orderRoute);
app.use("api/reviews", reviewRoute);
app.use("api/messages", messageRoute);
app.use("api/conversations", conversationRoute);

app.use((err,req,res,next)=>{
    const errStatus= err.status || 500;
    const errMessage= err.message || 'something went wrong';
    return res.status(errStatus).send(errMessage);

})
app.listen(5656,()=>{console.log("backend server is running")})