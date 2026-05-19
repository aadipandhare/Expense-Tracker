import React from 'react'
import {CustomPieChart} from '../Charts/CustomPieChart'

const COLORS = ["#875CF5", "#FA2C37","#FF6900"]

export const FinancialOverview = ({totalBalance,totalExpense,totalIncome}) => {

  const balanceData = [
    {name:"Total Balance", amount:totalBalance},
    {name: "Total Expense", amount:totalExpense},
    {name: "Total Income", amount:totalIncome}
  ]

  return (
    <div className='card flex flex-1'>
      <div className='flex-row items-center justify-between'>
        <h5 className='font-md text-gray-800 p-3'>Financial Overview</h5>
      </div>

    
      <CustomPieChart
        data={balanceData}
        label = "Total Balance"
        totalamount={`${totalBalance}`} 
        colors={COLORS}
        showTextAnchor
      />

    </div>
  )
}
