import React from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend} from 'recharts'
import {CustomToolTip} from './CustomToolTip'
import {CustomLegend} from './CustomLegend'

export const CustomPieChart = ({data,label,totalamount,colors,showTextAnchor}) => {
  return (
    <ResponsiveContainer width="100%" height={380}>
        <PieChart>
            <Pie
                data={data}
                dataKey="amount"
                nameKey='name'
                cx="50%"
                cy="50%"
                outerRadius={130}
                innerRadius={100}
                labelLine={false}
            >
                {data.map((entry, index)=>(
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]}/>
                ))}    
            </Pie>
            <Tooltip content={CustomToolTip}/>
            <Legend  content={<CustomLegend/>}/>

            {showTextAnchor &&  (
                <>
                    <text
                      x="50%"
                      y="50%"
                      dy={-25}
                      textAnchor="middle"
                      fill="#666"
                      fontSize="14px"
                    >
                    {label}
                    </text>

                    <text
                      x="50%"
                      y="50%"
                      dy={8}
                      textAnchor="middle"
                      fontSize="25px"
                      fontWeight="semi-bold"
                    >
                    ${totalamount}
                    </text>
                </>
            )}
        </PieChart>
    </ResponsiveContainer>
  )
}


//  <Tooltip content={CustomToolTip}/> 
// => In Recharts, the Tooltip component is designed to accept a custom renderer via the content prop.
