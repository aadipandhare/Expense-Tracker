import React from 'react'
import { TransactionInfoCard} from '../Cards/TransactionInfoCard'
import { BiDownload } from "react-icons/bi"; 
import { AiOutlinePlus } from "react-icons/ai";
import moment from 'moment'

export const ExpenseList = ({transaction, onDelete , onDownload}) => {
  return (
    <div className='card-chart flex flex-col'>
      
      <div className='flex flex-1 items-center justify-between p-3'>
        <h5>All Expenses</h5>

        <button className='add-btn'>
          <BiDownload /> Download
        </button>
      </div>

      <div className='grid grid-col-1 md:grid-cols-2 p-2 gap-5'>
        {transaction?.map((item)=>(
          <TransactionInfoCard
              key={item._id}
              title= {item.type == 'expense' ? item.source : item.category}
              icon = {item.icon}
              date ={moment(item.date).format('DD-MM-YYYY')}
              amount={item.amount}
              type="expense"
              onDelete={()=> onDelete(item.id)}
              hideDeleteBtn
          />
        ))}
      </div>



    </div>
  )
}
