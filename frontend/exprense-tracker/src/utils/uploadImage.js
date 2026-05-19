import API_PATHS from './apiPaths.js'
import {axiosInstance} from './axiosinstance.js'

const uploadImage =async()=>{
    try {
    const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE,{
    headers:{
        "Content-Type" :"multipart/formData"
    },
    })
    return response.data;
    } catch (error) {
        console.error("Server Error",error)
        throw error;
    }
}


export default uploadImage;

