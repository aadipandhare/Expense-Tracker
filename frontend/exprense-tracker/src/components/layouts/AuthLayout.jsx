import React from 'react'
import card from '../../assets/card.png'
import {LuTrendingUpDown} from "react-icons/lu";

export const AuthLayout = ({children}) => {
  return (
    <div className='flex'>
      <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
        <h3 className="text-lg font-medium text-black">Expense Tracker</h3>
        {children}
      </div>


      <div className="hidden md:block w-[40vw] h-screen bg-violet-50 pt-4 bg-auth-bg-img bg-cover bg-no-repeat overflow-hidden p-8 relative">
        <div className="w-49 h-52 bg-purple-700 rounded-[25%] absolute -top-8 -left-6" />
        <div className="w-48 h-56 rounded-[20%] border-20 border-fuchsia-500 absolute mt-70 top-40% -right-[10%]" />
        <div className="w-48 h-50 rounded-[40%] absolute bg-purple-800 -bottom-7 -left-10"/>
     <div />

        <div className='grid grid-col-1 z-20 '>
            <StatusInfoCard
              icon={<LuTrendingUpDown/>}
              label="Track Your Income & Expense"
              value="430,000"
              color="bg-primary"
              className=""
            />
        </div>

      <img className="w-70 lg:w-[90%] mt-[50%] absolute shadow-2xl" src={card} alt="" />
      </div>


      
    </div>
  )
}


const StatusInfoCard =({icon, label, value, color})=>{
  return(
      <div className="flex mt-5 gap-6 w-[80%] justify-center bg-white p-4 rounded-xl border shadow-md shadow-purple-400 border-gray-500 z-10">
      <div className={`w-12 h-12 flex items-center justify-center text-white text-[26px] ${color} rounded-full`}>
        {icon}
      </div>

      <div>
        <h3 className="text-sm text-gray-500 mb-1">{label}</h3>
        <span className="text-[20px ]">${value}</span>
      </div>
    </div>
  )
  
}
