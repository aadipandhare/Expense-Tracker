import React from 'react'
import { LuArrowRight } from "react-icons/lu";
import moment from 'moment'
import {TransactionInfoCard} from '../Cards/TransactionInfoCard'

export const ExpenseTransactions = ({transaction,onSeeMore}) => {
  return (
   <div className="card bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
  <div className="flex items-center justify-between p-5">
    <div>
      <p className="text-xs uppercase tracking-wider text-gray-400 font-medium">
        Overview
      </p>
      <h2 className="text-xl font-bold text-gray-800">
        Expenses
      </h2>
    </div>

    <button
      onClick={onSeeMore}
      className="group flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 transition-all duration-200 hover:bg-indigo-600 hover:text-white"
    >
      See All
      <LuArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
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
