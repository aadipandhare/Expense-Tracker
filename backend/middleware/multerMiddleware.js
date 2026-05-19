import express from 'express'
import multer from 'multer'

//Config storage
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null,'uploads/')
    },
    filename: function (req,file,cb){
        cb(null,`${Date.now()}-${file.originalname}`);
    },
})

//fileFilter
// Set this to a function to control which files should be uploaded and 
// which should be skipped. The function should look like this

const fileFilter = (req,file,cb) => {
    const allowedTypes = ['image/jpeg','image/png','image/jpg']
   
    if(allowedTypes.includes(file.mimetype)){
     cb(null,true)
   }else{
    cb(new Error('Only .jpeg, .jpg and .png formats are allowed'),false)
   }
    
    
}

const upload = multer({storage ,fileFilter})

export default upload;