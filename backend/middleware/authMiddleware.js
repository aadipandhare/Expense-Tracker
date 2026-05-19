import jwt from "jsonwebtoken"
import userModel from "../model/User.js"

//Verify Token
const protect = async (req,res,next)=>{

    // reads the Authorization header (Authorization: Bearer abc123token)
    // "If authorization exists, then split it — otherwise don't crash" (After .split(" "):["Bearer", "abc123xyzTOKEN"]
    //  => [1]This picks the second item:)
    // .select('-password') Means:"Get everything EXCEPT password"

    let token = req.headers.authorization?.split(" ")[1];
    
    if(!token){
        return res.json({message:"Token not found"})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await userModel.findById(decoded.id).select('-password')
        console.log(decoded)
        next();
    } catch (error) {
        return res.json({message:"Not Authorized, token failed"})
    }
}


export default protect;