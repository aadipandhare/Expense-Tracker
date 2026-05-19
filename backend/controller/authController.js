import userModel from '../model/User.js'
import jwt from "jsonwebtoken"


//Generate JWT Token
const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, { expiresIn:"1h"})
}





const registerUser= async (req,res)=>{
    const {name,email,password, profileImageUrl} = req.body;

    if(!name || !email || !password){
        return res.json({message:"All fileds required"})
    }

    try {
        const exits = await userModel.findOne({email})

        if(exits){
            return res.json({message:"User already exits"})
        }

        //create user
        const newUser = await userModel.create({
            name,
            email,
            password,
            profileImageUrl
        });

        res.json({
            id: newUser._id,
            user: newUser,
            token: generateToken(newUser._id)

        })


    } catch (error) {
        res.json(
            {success:false,
            message:"Error registating user",error:error.message
            }
        )
    }
    
}

const loginUser=async (req,res)=>{
    const {email, password} = req.body;

    try {
        
        const user = await userModel.findOne({email});
        
        //[ **await user.comparePassword(password)
        // comparePassword is usually a custom method defined on your user model.
        // It compares:
        // The entered password (password)
        // The hashed password stored in DB ]

        //check email & password
        if(!user || !(await user.comparePassword(password))){
            return res.json({message:"Invalid Credentials"})
        }

        //after succsfull login get the response & generate token
        res.json({
            id:user._id,
            user : user,
            token: generateToken(user._id)
        })

    } catch (error) {
        res.json({message :"Error in Login",error:error.message})
    }

}

const getUserInfo= async (req,res)=>{

    try {
        const user = await userModel.findById(req.user.id).select(password)

        if(!user){
            return res.status(404).json({message:"User not found"})
        }

    } catch (error) {
        res.status(500).json({success:false, message:"invalid", error:error.message})
        
    }

}   


export {registerUser, loginUser,getUserInfo}