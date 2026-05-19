import React,{useState,useEffect,useContext} from 'react'
import {AuthLayout} from "../../components/layouts/AuthLayout.jsx"
import { Input} from "../../components/Input/Input.jsx";
import {Link, useNavigate } from "react-router-dom"
import API_PATHS from '../../utils/apiPaths.js'
import {BASE_URL} from '../../utils/apiPaths.js'
import {axiosInstance} from '../../utils/axiosinstance.js'
import {validateEmail} from '../../utils/helper.js'
import {UserContext} from '../../context/UserContext'

export const Login = () => {

  const [email,setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const {updateUser}= useContext(UserContext)
  
  const navigate = useNavigate();

  const handleSubmit= async (e)=>{
    e.preventDefault();

    if(!validateEmail(email)){
      setError("Please Enter valid Email")
      return
    }

    if(!password){
      setError("Please Enter valid Password")
      return
    }

    setError("");

    //Login API Call
    try {
      
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN ,{email,password})
      const {token, user} = response.data;

      if(token){
        localStorage.setItem("token",token);
        updateUser(user)
        navigate('/dashboard')
      }

    } catch (error) {
        console.log("FULL ERROR:", error);

      if(error.response && error.response.data.message){
        setError(error.response.data.message);
      }else{
        console.log(error.message)
        setError("Something went wrong")
      }
    }

  }

  return (
    <AuthLayout>
      <div className="lg:w-[70] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black" >Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-1.25 mb-5">Please enter your details to log in</p>

      <form onSubmit={handleSubmit}>
        <div>
          <Input 
          type="text"
          label= 'Email Address'
          placeholder="john@gmail.com"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
           />

           <Input 
          type="password"
          label= 'Password'
          placeholder="Min 8 Characters"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
           />

           {error && <p className="text-red-400 text-xs pb-3">{error}</p>}

          <button type="submit" className="btn-primary w-full bg-violet-700 hover:bg-purple-600 hover:text-purple-00 text-white px-4 py-2 rounded cursor-pointer">
            Login
          </button>

          <p className="text-12px mt-3 text-slate-800">
          Dont have an Account? 
          <Link className="font-medium text-primary underline ml-3" to="/signUp">
            SignUp
          </Link>
          </p>
           

        </div>
      </form>
        
      </div>
    </AuthLayout>
  )
}
