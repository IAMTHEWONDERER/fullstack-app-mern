import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register =async (req,res)=>
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
        res.status(500).send({message: err.message});
    }
};
export const login =async (req,res)=>
{
    try{
        const user = await User.findOne({email: req.body.email});
        if(!user){
         return res.status(404).send(" something is wrong, maybe email or password incorrect")};
        const isCorrect = bcrypt.compareSync(req.body.password, user.password);
        if(!isCorrect){
            return res.status(400).send(" something is wrong, maybe email or password incorrect")};

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
        res.status(500).send({message: err.message});
    }
};
export const logout =async (req,res)=>
{
    try{}
    catch(err){
        res.status(500).send({message: err.message});
    }
}