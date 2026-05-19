import React,{useState,useEffect} from 'react'
import {CustomPieChart} from '../Charts/CustomPieChart'

const COLORS = ["#875CF5", "#FA2C37","#FF6900"]



export const Last60DaysIncome = ({data, totalIncome}) => {

  console.log(totalIncome)

  const [chartData,setChartData] = useState([])

const prepareChartData = ()=>{
  const dataArr = data.map((item)=>({
    name: item.source,
    amount: item.amount
  }))

  setChartData(dataArr)
}


useEffect(()=>{
  prepareChartData();

  return () =>{};
},[data])

  
  return (
    <div className='card flex flex-1'>
      <div className='flex-row items-center justify-between'>
        <h5 className='text-lg text-gray-700'>Last60DaysIncome</h5>
      </div>

      <CustomPieChart
        data={chartData}
        label="Total Income"
        totalamount={`${totalIncome}`} 
        colors={COLORS}
        showTextAnchor
      />


    </div>
  )
}
