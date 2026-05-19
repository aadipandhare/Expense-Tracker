import express from 'express'
import {addExpense,getExpense,deleteExpense,downloadExpenseExcel} from '../controller/expenseController.js'


const expenseRouter = express.Router();

expenseRouter.post('/add',addExpense);
expenseRouter.post('/get',getExpense);
expenseRouter.delete('/:id',deleteExpense);
expenseRouter.get('/downloadexel',downloadExpenseExcel)

export default expenseRouter;