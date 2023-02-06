const authorize=(user_role)=>{
    return (req,res,next)=>{
        let role = req.body.role;
        if (user_role.includes(role)){
            
            next();
        }
        else{
        res.json("You are not Authorised");
        }
    }
}

module.exports={authorize};