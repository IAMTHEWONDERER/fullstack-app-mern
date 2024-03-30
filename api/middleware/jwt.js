export const verifyToken = async (req,res,next) =>{
    const token = req.cookies.accessToken;
    if(!token) 
    {return res.status(401).send("you are not authenticated")};
    jwt.verify(token, process.env.JWT_SECRET, async (err, payload)=>{
        if(err)
        {return res.status(403).send("token is invalid")}
        req.userId = payload.id;
        req.isSeller = payload.isSeller;
     } )

}