import React,{useState} from 'react'
import {FaRegEye, FaRegEyeSlash} from "react-icons/fa6";

export const Input = ({label, value, onChange, type, placeholder}) => {
    const [showPassword,setShowPassword] = useState("");

    const toggleShowPassword=()=>{
      setShowPassword(!showPassword);
    };

  return (
    <div>
        <label className="text-[15px] text-slate-800" htmlFor="">{label}</label>

        <div className='input-box'>
            <input 
            type={type == 'password' ? showPassword ? 'text' : 'password' : type}
            placeholder={placeholder}
            value={value}
            className="w-full bg-transparent outline-none"
            onChange={(e)=> onChange(e)} 
            />

            {type == "password" && (
               <>
              {showPassword ? (
                <FaRegEye
                  size={22}
                  className="text-primary cursor-pointer"
                  onClick={()=> toggleShowPassword()}
                /> 
               ):(
                <FaRegEyeSlash
                  size={22}
                  className="text-slate-400 cursor-pointer"
                  onClick={()=> toggleShowPassword()}
                />
               )}
                
            </>
              )}
           
        </div>

        
    </div>
  )
}
