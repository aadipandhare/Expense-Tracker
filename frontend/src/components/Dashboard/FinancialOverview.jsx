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
 <div className="card flex flex-1 flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
  {/* Header */}
  <div className="flex items-center justify-between mb-4">
    <div>
     <h5 className="text-[25px] font-bold text-gray-600">
        Financial Overview
      </h5>
    </div>
  </div>

  {/* Chart */}
  <div className="flex flex-1 items-center justify-center">
    <CustomPieChart
      data={balanceData}
      label="Total Balance"
      totalamount={`${totalBalance}`}
      colors={COLORS}
      showTextAnchor
    />
  </div>
</div>
  )
}
