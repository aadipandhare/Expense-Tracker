import React from 'react'
import { LuArrowRight } from "react-icons/lu";
import {TransactionInfoCard} from '../Cards/TransactionInfoCard'
import moment from 'moment'

export const Income = ({transaction, onSeeMore}) => {
   try{
      console.log(transaction)
    }catch(error){
      console.error(error.message)
    }
  return (
    

   
  
    <div className='card flex flex-col'>
        <div className='flex flex-1 items-center justify-between p-8'>
            <h5 className='text-lg text-gray-500'>Income</h5>

            <button className='card-btn' onClick={onSeeMore}>Sell All <LuArrowRight /></button>
        </div>

        <div className='px-8'>
            {transaction?.slice(0,5).map((income)=>(
                <TransactionInfoCard
                    key={income._id}
                    title={income.source}
                    icon = {income.icon}
                    date={moment(income.date).format("DD-MM-YYYY")}
                    amount={income.amount}
                    type='income'
                    hideDeleteBtn
                />

            ))}
        </div>
    </div>
  )
}
