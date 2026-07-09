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
    <div className='card flex flex-1 flex-col rounded-2xl border border-gray-100 bg-white p-5'>
      <div className='flex-row items-center justify-between mb-4'>
        <h5 className=' text-[25px] font-bold text-gray-600 '>Last 60Days Income</h5>
      </div>
     
{/* <h5 className='text-xl font-semibold text-gray-800 '>Last60DaysIncome</h5> */}
      <div className='flex flex-1 item-center justify-center'>
        <CustomPieChart
        data={chartData}
        label="Total Income"
        totalamount={`${totalIncome}`} 
        colors={COLORS}
        showTextAnchor
        />
      </div>
      


    </div>
  )
}
