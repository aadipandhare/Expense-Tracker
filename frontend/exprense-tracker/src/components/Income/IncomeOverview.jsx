import { BiDownload } from "react-icons/bi"; 
import { AiOutlinePlus } from "react-icons/ai";
import React, { useState, useEffect } from "react";
import { prepareIncomeBarChartData } from "../../utils/helper.js";
import { CustomBarChart } from "../../components/Charts/CustomBarChart";
import { TransactionInfoCard} from '../Cards/TransactionInfoCard'
import moment from 'moment'
   

//barChart
export const IncomeOverview = ({ transaction, onAddIncome }) => {
  // console.log(transaction)
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeBarChartData(transaction);
    setChartData(result);

    return () => {};
  }, [transaction]);
  //  console.log(chartData)

  return (
    <div className="flex flex-col h-100 card-chart">
      
      <div className="flex items-center justify-between mb-2">
        
        <div className="px-4 py-3">
          <h5 className="text-lg">Income Overview</h5>
          <p className="text-xs text-gray-400 mt-1">
            Track your earning over the time and gain insights into where your
            money goes
          </p>
        </div>

        <button className="add-btn px-5" onClick={onAddIncome}>
          <AiOutlinePlus />
          Add Income
        </button>
      </div>

      <div className=" w-full ">
        <CustomBarChart height={300} width='100%'  data={chartData} />
      </div>




    

      

    </div>

    
  );
};
