import Gig from '../models/gigModel.js';
import createError from '../utils/createError.js'


export const createGig = async (req,res,next)=>{
    if(!req.isSeller){
        return next(createError(403, "Only seller can create gig"));
    }
    const newGig = new Gig({
        userId : req.userId,
        ...req.body,
    });
    try{
        const savedGig = await newGig.save();
        res.status(201).json(savedGig);
    }
    catch(err){
        next(err);
    }
}
export const deleteGig = async (req,res,next)=>{
    try{
        const gig = await Gig.findById(req.params.id);
        if(gigModel.userId !== req.userId){
            return next(createError(403, "you can delete only your gig"));
        }
        await Gig.findOneAndDelete(req.params.id);
        res.status(200).send("gig deleted"); 
    }
    catch(err){
        next(err);
    }
}
export const getGig = async (req,res,next)=>{
    try{
        const gig = await Gig.findById(req.params.id);
        if(!gig){
            next(createError(404, "gig not found"));
        }
        res.status(200).json(gig);

    }
    catch(err){
        next(err);
    }
}
export const getGigs = async (req,res,next)=>{
    const q = req.query;
    const filters = {
        ...(q.userId && {userId: q.userId}),
        ...(q.cat && {cat: q.cat}),
        ...((q.min || q.max) && {price: {...(q.min && {$gt : min}), ...(q.max && {$gt : max}) }}),
        ...(q.search && {title: {$regex:q.search, $options :"i"}}),
    }
    try{
        const gigs = await Gig.find();
        if(!gigs){
            return next(createError(404, "gig specific not found"))
        }
        res.status(200).json(gigs);
    }
    
    catch(err){
        next(err);
    }
}