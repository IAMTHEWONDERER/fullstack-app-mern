import User from '../models/userModel'


export const deleteUser = async (req,res,next)=>{
    const user = await User.findById(req.params.id);
    
    
     if(req.userId !== user._id.toString()){
        return next(createError(403,' cannot delete other accounts'));
     }

    await User.findOneAndDelete(req.params.id);
    res.status(200).send('user deleted');
}