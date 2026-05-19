import React,{useState,useContext} from 'react'
import {AuthLayout} from "../../components/layouts/AuthLayout.jsx"
import {Input} from "../../components/Input/Input.jsx"
import {ProfilePhotoSelector} from "../../components/Input/ProfilePhotoSelector"
import {Link, useNavigate} from "react-router-dom"
import profile from "../../assets/profile.jpg"
import uploadImage from '../../utils/uploadImage.js'
import {UserContext} from '../../context/UserContext'
import {axiosInstance} from '../../utils/axiosinstance.js'
import {validateEmail} from '../../utils/helper.js'
import API_PATHS from '../../utils/apiPaths.js'

export const SignUp = () => {

  const [profilePic, setProfilePic ] = useState("")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [error,setError] = useState("")

  const {updateUser} = useContext(UserContext)

  const navigate = useNavigate();

  const handleSubmit=async (e)=>{
    e.preventDefault();

    if(!fullName){
      setError("Please Enter name");
      return;
    }

    if(!validateEmail){
      setError("Please Enter valid Email")
      return;
    }

    if(!password){
      setError("Please Enter Password");
      return;
    }

    setError("")
    
    //Signup API Call
    try {

      //Upload image if present
      if(profilePic){
        const imgUplaodRes = await uploadImage(profilePic);
        profileImageUrl = imgUplaodRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER,{
        fullName,
        email,
        password,
        profileImageUrl
      })
      const {token,user} = response.data;

      if(token){
        localStorage.setItem('token',token)
        updateUser(user)
        navigate('/dashboard')
      }
      
    } catch (error) {
      if(error.response && error.response.data.message){
        setError(error.response.data.message)
      }else{
         setError("Something went wrong")
        //  res.json({error:error.response.data.message})
      }
      
    } 
  }
  return (
    <div>
    <AuthLayout>
      <div className="lg:w[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold mt-5">Create an Account</h3>
        <span>Join us today by entering your details below</span>

        <ProfilePhotoSelector image={profile} setImage={setProfilePic}/>
        

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            <Input
              type="text"
              label ="Full Name"
              value={fullName}
              placeholder="Enter Name"
              onChange={(e)=>setFullName(e.target.value)}

              />

              <Input
                type="text"
                label="Email Address"
                value={email}
                placeholder="john@example.com"
                onChange={(e)=>setEmail(e.target.value)}
              />

          </div>

          <div className="col-span-2">
              <Input
                type="text"
                label="Password"
                value={password}
                placeholder="Min 8 Characters"
                onChange={(e)=>setPassword(e.target.value)}

              /> 
          </div>

          <button className="bg-violet-600 text-white text-ls w-full hover:bg-purple-500 px-4 py-2 ">
            SIGNUP
          </button>

          <p className="text-12px mt-3">
          Already have an account?
          <Link className="font-medium ml-3 text-primary underline"to="/login">
               Login
          </Link>
          </p>
          



        </form>
      </div>

    </AuthLayout>
    </div>
  )
}
