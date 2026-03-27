import React,{useState} from 'react'
import {AuthLayout} from "../../components/layouts/AuthLayout.jsx"
import {Input} from "../../components/Input/Input.jsx"
import {ProfilePhotoSelector} from "../../components/Input/ProfilePhotoSelector"
import {Link} from "react-router-dom"
import profile from "../../assets/profile.jpg"

export const SignUp = () => {

  const [profilePic, setProfilePic ] = useState("")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [error,setError] = useState("")

  const handleSuubmit=()=>{
    e.preventDefault();
  }
  return (
    <div>
    <AuthLayout>
      <div className="lg:w[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold mt-5">Create an Account</h3>
        <span>Join us today by entering your details below</span>

        <ProfilePhotoSelector></ProfilePhotoSelector>
        {/* <div>
          <img  className="w-40 h-40 object-contain mx-auto lg:w-[90%]" src={profile} alt="" />
        </div> */}

        <form>
          <div className="flex gap-8 w-1/2  ">
            <Input
              type="text"
              label ="Full Name"
              value={""}
              placeholder="Enter Name"
              onChange={()=>setName(e.target.value)}

              />

              <Input
                type="text"
                label="Email Address"
                value={email}
                placeholder="john@example.com"
                onChange={(e)=>setEmail(e.target.value)}
              />

          </div>

          <div>
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
