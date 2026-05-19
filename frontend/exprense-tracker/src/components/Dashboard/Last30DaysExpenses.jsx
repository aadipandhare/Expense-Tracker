import React,{useState,useEffect} from 'react'
import {prepareExpenseBarChartData} from '../../utils/helper.js'
import { CustomBarChart } from "../Charts/CustomBarChart";

export const Last30DaysExpenses = ({data}) => {

    const [chartData,setChartData] = useState([])

    useEffect(() => {
        const result = prepareExpenseBarChartData(data);
        setChartData(result);

        return () => {};
    },[data])




// useEffect(() => {
//     console.log("RAW DATA:", data);

//     const result = prepareExpenseBarChartData(data);

//     console.log("CHART DATA:", result);

//     setChartData(result);
// }, [data]);



  return (
    <div className='card col-span-1 '>
        <div className='flex items-center justify-center'>
            <h5 className='text-lg'>last30DaysExpenses</h5>
        </div>

        <CustomBarChart
            data={chartData}
        />
    </div>
  )
}
