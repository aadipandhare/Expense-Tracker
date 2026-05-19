import express from 'express'
import {getdashboard} from '../controller/dashboardController.js'
import protect from '../middleware/authMiddleware.js'

const dashBoardRouter = express.Router();

dashBoardRouter.get('/get',protect,getdashboard)
// dashBoardRouter.post('/')

export default dashBoardRouter;
