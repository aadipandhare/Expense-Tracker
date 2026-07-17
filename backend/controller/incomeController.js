import express from 'express'
import incomeModel from "../model/Income.js"
import xlsx from 'xlsx'

export const addIncome = async (req,res)=>{
    const userId = req.body.userId;
    console.log(req.body.userId);
    try {
        const {icon,source,amount,date} = req.body;

        if(!icon || !source || !amount || !date){
            res.json({success: false, message:"All fields required"})
        }


        //in controller we save the data from model to database
        //taking data from modelSchema to store in database
        // always take model name in controller which is imported 
        const newIncome= new incomeModel({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        })

        await newIncome.save()
        res.json(newIncome)
        
    } catch (error) {
        res.json({message:"Error",error:error.message})
    }
    console.log("USER:", req.user);
}

export const getIncome = async (req,res)=>{

    // const userId = req.user.id;
    const userId = req.body.userId
    console.log(userId)

    try {
        const income = await incomeModel.find({userId}).sort({date :-1});
        res.json((income))
    } catch (error) {
        res.json({message:"Not found",error:error.message})
        
    }
}


export const deleteIncome = async (req,res) =>{
    try{
        
        // req.params => add direct id in route url in postmon
        await incomeModel.findByIdAndDelete(req.params.id)
        res.json({message:"Income deleted Succesfully"})

    }catch(err){
        res.json({message:"error",error:err.message})
     }
    
}


export const downloadIncomeExcel = async (req,res) =>{
    // const userId = req.user._id;
     const userId = req.body.user;
    console.log(userId)

    try{
        
        //Sort the results by date in descending order
        const income = await incomeModel.find({userId}).sort({date:-1})
        console.log(income);


        //Prepare Data for Excel         // Convert JSON → Worksheet

        const data = income.map((item)=>({
            Amount: item.amount,
            Date: item.date,
        }))

        //create workBook  // Convert JSON → Worksheet
        const wb = xlsx.utils.book_new();

        //create worksheet and convert
        const ws = xlsx.utils.json_to_sheet(data)
        xlsx.utils.book_append_sheet(wb, ws, "Income");

        // Write file to buffer
        xlsx.writeFile(wb, 'income_details.xlsx');
        res.download('income_details.xlsx');

    }catch(error){
        res.status(500).json({message:"Server Error",error:error.message})
    }
}