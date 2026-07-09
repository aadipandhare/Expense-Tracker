import React,{useState,useEffect} from 'react'
import { BiDownload } from "react-icons/bi"; 
import { AiOutlinePlus } from "react-icons/ai";
import { CustomLineChart } from "../../components/Charts/CustomLineChart";
import { prepareExpenseLineChartData } from "../../utils/helper.js";


export const ExpenseOverview = ({transaction, onAddExpense}) => {

  const [chartData, setChartData] = useState([])

  useEffect(() => {
    const result = prepareExpenseLineChartData(transaction);
    setChartData(result)
  
    return () => {}
  }, [transaction])
  
  return (
    <div className='card-chart flex flex-col'>
      <div className='flex flex-1 p-3 items-center justify-between'>

        <div className=''>
          <h5 className='text-lg'>Expense Overview</h5>
          <p className='text-xs'>Track your spending trends over time and gain insights into where your money goes.</p>
        </div>
        

        <div>
          <button className='add-btn' onClick={onAddExpense}>
             <AiOutlinePlus />
             Add Expense
          </button>
        </div>
      </div>


      <div className='w-full mt-5 p-3'>
        <CustomLineChart  height={300} width='100%' data={chartData}/>
      </div>


    </div>
  )
}
