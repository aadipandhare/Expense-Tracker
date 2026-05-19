import React,{useState} from 'react'
import {Input} from '../Input/Input'
import {EmojiPickerPop} from '../EmojiPickerPop'


export const AddIncomeForm = ({onAddIncome}) => {

const [income, setIncome] = useState({
    source:"",
    amount:"",
    icon: "",
    date :""
})

const handleChange =(key, value)=> setIncome({...income, [key]: value})

    return (
    <div className='p-3'>

    <EmojiPickerPop
        icon={income.icon}
        onSelect={({selectedIcon})=> handleChange('icon', selectedIcon)} 
        onChange={({target}) => handleChange("icon", target.value)}   

    />
        <Input
            value={income.source}
            onChange={({target})=> handleChange("source" , target.value)}
            label="Income Source"
            placeholder="Freelancer, Salary etc"
            type="text"
        />

        <Input
            value={income.amount}
            onChange={({target})=> handleChange("amount", target.value)}
            label="Income Amount"
            type = 'number'
        />

        <Input 
            value={income.date}
            onChange={({target})=> handleChange("date", target.value)}  
            label="Date"      
            placeholder="dd-mm-yyyy"
            type="date" 
        />

        <div className='flex justify-end mt-6'>
            <button 
                    className='add-btn add-btn'
                    type='button'
                    onClick={()=>onAddIncome(income)}
            >
                Add Income
            </button>
        </div>
    </div>
  )
}
