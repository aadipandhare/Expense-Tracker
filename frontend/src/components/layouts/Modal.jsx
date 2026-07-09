import { AiOutlineClose } from "react-icons/ai"; 
import { AiOutlineCloseCircle } from "react-icons/ai"; 
import {AddIncomeForm} from '../Income/AddIncomeForm'
import React from 'react'

export const Modal = ({children, isOpen, onClose, title}) => {

    if(!isOpen) return null
     
  return (
    <div className='fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden bg-black/20 bg-opacity-50'>
        <div className='relative p-4 w-full max-w-2xl max-h-full'>
            {/* content */}
            <div className='relative bg-gray-100 rounded-lg shadow-sm dark:hover:bg-gray-300'>
                {/* header */}

                
                
                <div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200'>
                    <h3 className='text-lg font-medium text-gray-700 '>{title}</h3>

                    <button
                      type="button"
                      className='text-gray bg-transparent hover:bg-gray-300 hover:text-gray-90 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer'
                      onClick={onClose}
                    >
                        <AiOutlineClose />
                      </button>
                </div>
                

                {/* <AddIncomeForm className=''/> */}
                {/* model */}
                <div className='p-4 md:p-5 space-y-4'>
                    {children}
                </div>
            </div>
        </div>
    </div>
  )
}
