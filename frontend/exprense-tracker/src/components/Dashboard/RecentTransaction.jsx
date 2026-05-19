import React from 'react'
import { LuArrowRight } from "react-icons/lu";
import moment from 'moment'
import {TransactionInfoCard} from '../Cards/TransactionInfoCard'

export const RecentTransaction = ({transaction, onSeeMore}) => {
  return (
    <div className='card flex flex-col'>
        
        <div className='flex flex-1 items-center justify-between p-2'>
            <h5 className='p-3 text-lg text-gray-800'>Recent Transaction</h5>
            
            <button className="card-btn" onClick={onSeeMore}>
            Sell more <LuArrowRight />
            </button>
        </div>


        <div className='mt-6 px-8'>
            {transaction?.slice(0,5)?.map((item)=>(
                <TransactionInfoCard
                    key={item._id}
                    title={item.type =='expense' ? item.category : item.source}
                    icon= {item.icon}
                    date = {moment(item.date).format("DD-MM-YYYY")}
                    amount={item.amount}
                    type={item.type}
                    hideDeleteBtn

                />
    
        ))}
        </div>     
    
    
    </div>
  )
}
