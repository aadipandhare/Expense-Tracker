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
const [error,setError] = useState("");

const handleChange =(key, value) => {setIncome({...income, [key]: value})
    if (key === "amount") {
    setError("");
  }};


// const handleSubmit=()=>{
//     const amount = Number(income.amount);

//     if(isNaN(amount) || amount <=0){
//             setError("Amount should be a valid number greater than 0");
//             return;
//     }

//     setError("")
//     onAddIncome(income)
// }

    return (
    <div className='p-3'>

    <EmojiPickerPop
        icon={income.icon}
        onSelect={({selectedIcon}) => handleChange('icon', selectedIcon)} 
        onChange={({target}) => handleChange("icon", target.value)}   

    />
        <Input
            value={income.source}
            onChange={({target}) => handleChange("source" , target.value)}
            label="Income Source"
            placeholder="Freelancer, Salary etc"
            type="text"
        />

        <Input
            value={income.amount}
            onChange={({target}) => handleChange("amount", target.value)}
            label="Income Amount"
            type ="number"
         />
          {/* {error && (
                <p className='text-red-500 text-sm mt-1'>{error}</p>
            )} */}

        <Input 
            value={income.date}
            onChange={({target}) => handleChange("date", target.value)}  
            label="Date"      
            placeholder="dd-mm-yyyy"
            type="date" 
        />

        <div className='flex justify-end mt-6'>
            <button 
                    className='add-btn add-btn'
                    type='button'
                    onClick={()=>onAddIncome(income)}
                    // onClick={handleSubmit}
            >
                Add Income
            </button>
        </div>
    </div>
  )
}
