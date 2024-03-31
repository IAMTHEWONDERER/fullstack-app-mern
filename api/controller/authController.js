import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import createError from '../utils/createError.js';
export const register =async (req,res,next)=>
{
    try{
        const hash = bcrypt.hashSync (req.body.password, 10);
        const newUser = new User({
                ...req.body,
               password: hash,
            });
        await newUser.save();
        res.status(201).send("user created");
    }
    catch(err){
        next(err);
    }
};
export const login =async (req,res,next)=>
{
    try{
        const user = await User.findOne({email: req.body.email});
        if(!user){
         return next(createError(404, " user not found"))
        };
        const isCorrect = bcrypt.compareSync(req.body.password, user.password);
        if(!isCorrect){
            return next(createError(400, "incorrect password or email"))
        };
            const token = jwt.sign({
                id: user._id,
                isSeller: user.isSeller,
            },
            process.env.JWT_KEY);
       const {password,...info} = user._doc;
       
       res.cookie("acessToken", token,{
        httpOnly: true,
       })
       .status(200)
       .send(info)
    }
    catch(err){
        next(err);
    }
};
export const logout =async (req,res)=>
{
    res.clearCookie("accessToken",{
        sameSite:'none',
        secure: true
    })
    .status(200)
    .send("user logged out");
};