import React from 'react'

export const CustomToolTip = ({active, payload}) => {
    if(active && payload && payload.length){

        return (
            <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
                <p className='text-xs text-purple-800'>{payload[0].name}</p>
                <p className='text-sm text-gray-600'>
                    Amount: <span className="text-sm font-medium text-gray-900">${payload[0].value}</span>
                </p>
            </div>
        )
    }
  return null;
}


// In Recharts, a Tooltip is the small popup that appears when you hover over a chart element (like a pie slice). 
// It shows extra information about that specific data point.