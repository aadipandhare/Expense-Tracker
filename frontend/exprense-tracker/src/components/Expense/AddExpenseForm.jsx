import React,{useState,useEffect} from "react";
import {Input} from '../Input/Input'
import {EmojiPickerPop} from '../EmojiPickerPop'

export const AddExpenseForm = ({ onAddExpense }) => {
  const [expense, setExpense] = useState({
    category: "",
    amount: "",
    icon: "",
    date: "",
  });

  const handleChange = (key, value) => setExpense({ ...expense, [key]: value });
  return (
    <div>
      <EmojiPickerPop
        icon={expense.icon}
        onSelect={(selectedIcon ) => handleChange("icon", selectedIcon)}
        onChange={({target}) => handleChange("icon", target.value)}
      />

      <Input
        value={expense.category}
        label="Expense category"
        onChange={({target}) => handleChange("category", target.value)}
        type="text"
      />

      <Input
        value={expense.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Expense Amount"
        type="number"
      />

      <Input
        value={expense.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        placeholder="dd-mm-yyyy"
        type="date"
      />

      <div className="flex justify-end mt-6">
        <button
          className="add-btn add-btn"
          type="button"
          onClick={() => onAddExpense(expense)}
        >
        Add Expense 
        </button>
      </div>
    </div>
  );
};
