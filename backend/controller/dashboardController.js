    import express from "express";
    import incomeModel from '../model/Income.js'
    import expenseModel from '../model/Expense.js'
    import { isValidObjectId, Types} from 'mongoose'


    export const getdashboard = async (req,res)=>{
        try {
            const userId = req.user._id;
            console.log(userId);


            //Converts userId into a MongoDB ObjectId
            //Why needed: MongoDB stores IDs as ObjectId, not plain strings.
            const userObjectId = new Types.ObjectId(String(userId));

            //*fetch total income & expense
            //_id: null → means group everything together ,$sum: "$amount" → adds all amount fields
            const totalIncome = await incomeModel.aggregate([
                {$match: {userId: userObjectId}},
                {$group: {_id:null, total: {$sum:"$amount"}}},
            ])

            //Checks if userId is a valid MongoDB ObjectId
            console.log("totalIncome",{totalIncome,userId: isValidObjectId(userId)})

            const totalExpense = await expenseModel.aggregate([
                {$match: {userId: userObjectId}},
                {$group: {_id:null,total:{$sum:"$amount"}}}
            ])





// console.log("userObjectId:", userObjectId);
// console.log("60 days ago:", new Date(Date.now() - 60 * 24 * 60 * 60 * 1000));





            //**Get income transition in the last 60 days
            const last60DaysIncomeTransaction = await incomeModel.find({
               userId:userObjectId,
                date : { $gte: new Date(Date.now() - 60 *24 * 60 * 60 * 1000)}
            }).sort({date:-1})


// console.log("Fetched last 60 days income:", last60DaysIncomeTransaction);






            //**Get total income for last 60 days
            const incomeLast60Days = last60DaysIncomeTransaction.reduce(
                (sum,transaction) => sum + transaction.amount,0
            );


            //**Get expense transition in the last 30days
            const last30DaysexpenseTransaction = await expenseModel.find({
                userId,
                date: { $gte: new Date(Date.now() -30 * 24 * 60 * 60 * 1000 )}
            }).sort({date: -1})

            //Get TOTAL expense for last 30 days
            const expenseLast30Days = last30DaysexpenseTransaction.reduce(
                (sum,transaction) => sum + transaction.amount, 0
            );


            //**Fecth last 5 transaction (inocme+expense)
            const lastTransaction = [
                ...(await incomeModel.find({userId}).sort({date:-1}).limit(5)).map(
                (txn)=>(
                    {
                    ...txn.toObject(),
                    type: "income",

                })
            ),

            ...(await expenseModel.find({userId}).sort({date:-1}).limit(5)).map(
                (txn)=>({
                    ...txn.toObject(),
                    type:"expense"
                })
            ),
            ].sort((a,b) => new Date(b.date) - new Date(a.date)).slice(0,5);





            res.json({
                totalBalance:( totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
                totalIncome : totalIncome[0]?.total || 0,
                totalExpense : totalExpense[0]?.total || 0,

                last30DaysExpenses: { total: expenseLast30Days, transaction: last30DaysexpenseTransaction},
                last60DaysIncome : { total: incomeLast60Days, transaction: last60DaysIncomeTransaction},
                recentTransactions : lastTransaction,

            });
        

        } catch (error) {
            res.status(500).json({message:"Server Error",error:error.message})
            
        }

    }







    // $gte : "greater than or equal to" Used for date filtering.,
    // new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) : Calculates timestamp for 60 days ago(60 days × 24 hrs × 60 min × 60 sec × 1000 ms)
    // (sum, transaction) =>  sum → accumulated total, transaction → current item 
    // transaction.amount =>  Adds each transaction’s amount to total , 0 initial value of sum

    // txn.toObject() => Converts Mongoose document → plain JavaScript object
    // ...txn.toObject() => Spread operator
    // ...	 => Copy properties from another objec
    // type: "income" => Adds a new field to identify transaction type

    // {} → function body
    // ({}) → object literal return