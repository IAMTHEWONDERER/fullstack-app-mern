
 


export const deleteUser = (req,res)=>{
    const {userId} = req.params;
    User.findOneAndDelete({_id:userId},(err,user)=>{
        if(err){
            res.status(500).send({message: err.message});
        }
        else{
            res.status(200).send(user);
        }
    })
}