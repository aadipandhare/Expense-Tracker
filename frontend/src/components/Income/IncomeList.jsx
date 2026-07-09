import React from "react";
import { prepareIncomeBarChartData } from "../../utils/helper.js";
import { CustomBarChart } from "../../components/Charts/CustomBarChart";
import { TransactionInfoCard} from '../Cards/TransactionInfoCard'
import moment from 'moment'
import { BiDownload } from "react-icons/bi"; 
import { AiOutlinePlus } from "react-icons/ai";

export const IncomeList = ({ transaction, onDelete, onDownload }) => {
  return (
    <div>
      <div className="card-chart flex flex-col">
        <div className="flex flex-1 justify-between p-3">
          <h5 className='text-lg'>Income Sources</h5>

          <button className="add-btn" onClick={onDownload}>
            <BiDownload /> Download
          </button>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
          {transaction?.map((item) => (
            <TransactionInfoCard
              key={item.id}
              title={item.type == "income" ? item.category : item.source}
              icon={item.icon}
              date={moment(item.date).format("DD-MM-YYY")}
              amount={item.amount}
              type="income"
              onDelete={() => onDelete(item._id)}
              hideDeleteBtn
            />
          ))}
        </div>
      </div>
    </div>
  );
};
