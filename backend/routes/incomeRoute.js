import express from 'express'
import {addIncome,getIncome,deleteIncome,downloadIncomeExcel} from '../controller/incomeController.js'
import protect from '../middleware/authMiddleware.js'

const incomeRouter = express.Router()



incomeRouter.post('/add',addIncome)
incomeRouter.post('/get',getIncome)
incomeRouter.delete('/:id',deleteIncome)
incomeRouter.get('/downloadexcel',downloadIncomeExcel)
console.log("Income routes loaded");    

export default incomeRouter;