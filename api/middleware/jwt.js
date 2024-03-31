import jwt from 'jsonwebtoken';
import createError from '../utils/createError.js'



export const verifyToken = async (req,res,next) =>{
    const token = req.cookies.accessToken;
    if(!token) 
        {return next(createError(401,' you are not authenticated'))
    };

    jwt.verify(token, process.env.JWT_SECRET, async (err, payload)=>{
        if(err)
        {return next(createError(401, " token invalid"))}
        req.userId = payload.id;
        req.isSeller = payload.isSeller;
        next();
     } )

}