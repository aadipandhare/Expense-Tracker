import express from 'express'
import expenseModel from '../model/Expense.js'
import xlsx from 'xlsx'

export const addExpense = async (req,res)=>{

    //use only if middelware is attached
    // const userId = req.user.id;

    const userId = req.body.userId;
    try {
        const {icon,category,amount,date} = req.body;

        if(!category || !amount || !date){
            return res.status(400).json({message:"All fileds required",error:error.message})
        }

        
        const expense = new expenseModel({
            userId,
            icon,
            category,
            amount,
            date:new Date(date)
        })

        await expense.save()
        res.json(expense)
        console.log(expense)

    } catch (error) {
        res.json({message:"Error",error:error.message})
    }
}

export const getExpense = async (req,res)=>{

    const userId = req.body.userId;
    console.log(userId)
    try {

        const expense = await expenseModel.find({userId})
        res.json(expense)

    } catch (error) {
        res.json({message:"Not found",error:error.message})
    }
}

export const deleteExpense = async(req,res)=>{

    try {
        const deleted = await expenseModel.findByIdAndDelete(req.params.id)
       

        if(!deleted){
            res.json({message:"Not deleted!!"})
        }

        return res.json({message:"Expense deleted succesfully"})

    } catch (error) {
        res.json({message:"delete error", error:error.message})
        
    }
    console.log("ID",req.params.id)

}

export const downloadExpenseExcel = async(req,res)=>{
    const userId = req.body.user;

    try {
        
        const expense = expenseModel.find({userId})
        console.log(expense)

        const data = expense.map((item)=>(
            {
            Category: item.category,
            Amount : item.amount,
            Date : item.date
        }
        ))

        const wb = xlsx.utils.book_new();
        
         //create worksheet and convert
         const ws = xlsx.utils.json_to_sheet(data)
        xlsx.utils.book_append_sheet(wb, ws, "Income");
        
        // Write file to buffer
         xlsx.writeFile(wb, 'income_details.xlsx');
        res.download('income_details.xlsx');

    } catch (error) {
         res.status(500).json({message:"Server Error",error:error.message})
    }

}

