import React from 'react'
import { LuUtensils,LuTrash, LuTrendingUp, LuTrendingDown } from "react-icons/lu";

export const TransactionInfoCard = ({
    
    title,
    icon,
    date, 
    amount,
    type,
    onDelete,
    hideDeleteBtn
}) => {

    const getAmountStyle =()=> type == "income" ? "text-green-500 bg-green-50" : "text-red-500 bg-red-50"
    
//   <img src={icon} alt={title} className='w-6 h-6'/>
  return (

    <div className='flex items-center bg-white  mt-2 p-2  rounded-full border border-gray-200 shadow-lg mb-7'>
        
        <div className='w-12 h-12 flex items-center justify-center text-lg bg-gray-200 text-gray-400 rounded-full'>
            {icon ? 
              <span className='text-2xl flex items-center justify-center'>{icon}</span>
        
                : (
                    <LuUtensils/>
                )}
        </div>
        
            <div className="flex-1 flex items-center justify-between px-4">
                <div>
                    <p className='font-medium text-md mb-1 text-gray-700'>{title}</p>
                    <p className='font-medium text-xs text-gray-400'>{date}</p>
                </div>

                <div className='flex items-center gap-2'>
                    {!hideDeleteBtn && 
                    <button className='text-gray-400 hover:text-red-400 opacity-70%'
                        onClick={onDelete} >
                        <LuTrash />
                    </button>}
                </div>

                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl ${getAmountStyle()}`}>
                    <h6 className='text-sm font-sm'>
                        {type == 'income' ? "+" : "-"} ${amount}
                    </h6>
                     
                     {type == 'income' ? <LuTrendingUp /> : <LuTrendingDown />}
                </div>


            </div>
    </div>
  )
}
