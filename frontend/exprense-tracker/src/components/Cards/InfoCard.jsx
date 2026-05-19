import React from 'react'

export const InfoCard = ({icon, label, value, color}) => {
  return  <div className='flex bg-white rounded-xl p-5 shadow-md shadow-gray-400 border border-gray-400'> 
        <div className={`w-14 h-14 bg-violet-500 justify-center flex items-center rounded-full text-white ${color} drop-shadow-amber-50 `}>
            {icon}
        </div>

        <div>
        <h6 className='px-2 text-sm text-gray-500'>{label}</h6>
        <span className='px-2 text-[22px]'>${value}</span>
        </div>


    </div>


    
    
  
}
