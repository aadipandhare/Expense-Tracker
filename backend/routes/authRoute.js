import express from "express"
import {registerUser, loginUser, getUserInfo} from "../controller/authController.js"
import protect from '../middleware/authMiddleware.js'
import upload from '../middleware/multerMiddleware.js'

const authRouter = express.Router();

authRouter.post('/register',registerUser)
authRouter.post('/login', loginUser);
authRouter.get("/getUser",protect,getUserInfo)

authRouter.post('/upload-image', upload.single("image"), (req,res)=>{
    
    // If user didn’t upload file
    if(!req.file){
        return res.status(400).json({message:"No file uploaded"})
    }


    //for getting URL of image
    // [req.protocol => http ],[ req.get("host") => domain + port:localhost:5000 ], [req.file.filename => 712345678-photo.png]  
    // ==> http://localhost:5000/uploads/1712345678-photo.png
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
    res.status(200).json({ imageUrl });
})


export default authRouter;