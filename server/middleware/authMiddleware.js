import jwt from 'jsonwebtoken';
function authMiddleware(req,res,next){
    const authHeader =  req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({error: "Not Authorized"});
    }
    try{
        const bearerToken = authHeader.split(" ")[1];
        const decoded = jwt.verify(bearerToken,process.env.JWT_SECRET);
        req.userId = decoded.userId;
    }
    catch(error){
        return res.status(401).json({error: "Invalid token"});
    }
    next();
};

export default authMiddleware;