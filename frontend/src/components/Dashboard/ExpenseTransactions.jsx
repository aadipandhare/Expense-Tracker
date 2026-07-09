import React from 'react'
import { LuArrowRight } from "react-icons/lu";
import moment from 'moment'
import {TransactionInfoCard} from '../Cards/TransactionInfoCard'

export const ExpenseTransactions = ({transaction,onSeeMore}) => {
  return (
    <div className='card flex flex-col'>
        <div className='flex flex-1 p-4 items-center justify-between'>
            <h5 className='p-2 text-[25px] font-bold text-gray-600'>
            Expenses
            </h5>

            <button className='card-btn' onClick={onSeeMore}>
            Sell All <LuArrowRight />
            </button>
        </div>


        <div className='px-8'>
            {transaction?.slice(0,5)?.map((expense)=>(
                <TransactionInfoCard
                    key={expense._id}
                    title={expense.category}
                    icon = {expense.icon}
                    date = {moment(expense.date).format("DD-MM-YYYY")}
                    amount = {expense.amount}
                    type = "expense"
                    hideDeleteBtn
                />
            ))}

        </div>
    </div>
  )
}
