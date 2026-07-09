import React,{useState,useEffect} from 'react'
import {prepareExpenseBarChartData} from '../../utils/helper.js'
import { CustomBarChart } from "../Charts/CustomBarChart";

export const Last30DaysExpenses = ({data}) => {

    const [chartData,setChartData] = useState([])

    useEffect(() => {
        const result = prepareExpenseBarChartData(data);
        setChartData(result);
        console.log(result)

        return () => {};
    },[data])


  return (
    <div className='card col-span-1 '>
        <div className='flex items-center justify-center'>
            <h5 className='text-[22px] font-bold text-gray-600 mb-70 pl-5'>Last 30Days Expenses</h5>
        </div>
        
         <div className='flex flex-1 item-center justify-center mt-10 mr-10'>
            <CustomBarChart
            data={chartData}
            />
         </div>
        
    </div>
  )
}
