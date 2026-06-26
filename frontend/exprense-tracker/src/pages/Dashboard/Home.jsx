import {React,useState,useEffect} from 'react'
import {DashboardLayout} from "../../components/layouts/DashboardLayout";
import {useUserAuth} from '../../hooks/useUserAuth.jsx'
import {useNavigate} from 'react-router-dom'
import {axiosInstance} from '../../utils/axiosinstance.js'
import API_PATHS from '../../utils/apiPaths.js'
import {addthousandSeparator} from '../../utils/helper.js'
import {InfoCard} from '../../components/Cards/InfoCard'
import {RecentTransaction} from '../../components/Dashboard/RecentTransaction'
import {FinancialOverview} from '../../components/Dashboard/FinancialOverview'
import {ExpenseTransactions} from '../../components/Dashboard/ExpenseTransactions'
import {Last30DaysExpenses} from '../../components/Dashboard/Last30DaysExpenses'
import {Last60DaysIncome} from '../../components/Dashboard/Last60DaysIncome'
import {Income} from '../../components/Dashboard/Income'

import { LuHandCoins, LuWalletMinimal} from "react-icons/lu";
import { IoMdCard } from "react-icons/io";
import { IoWallet } from "react-icons/io5";

export const Home = () => {
  useUserAuth();

  const navigate = useNavigate();

  const [dashboardData,setDashboardData] = useState(null)
  const [loading,setLoading] = useState(false)


  const fetchDashBoardData= async ()=>{

    if(loading) return;

    setLoading(true)
    try {

      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);

      console.log(response)
      if(response.data){
        setDashboardData(response.data)
      }

       
    } catch(error) {
      console.log("Something went wrong",error)
    
    }finally {
      setLoading(false)
    }
  }

 console.log(setDashboardData) 
useEffect(() => {
  fetchDashBoardData();
  return () => {
  }
}, [])




  
  return (
    <DashboardLayout activeMenu={"Dashboard"}>
      <div className='my-5 mx-auto'>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <InfoCard
            icon={<IoMdCard/>}
            label="Total Balance"
            value={addthousandSeparator(dashboardData?.totalBalance || 0)}
            color="bg-primary"
          />
          <InfoCard
            icon={<IoWallet />}
            label="Total Income"
            value={addthousandSeparator(dashboardData?.totalIncome || 0)}
            color="bg-orange-500"
          />
          <InfoCard
            icon={<LuHandCoins />}
            label="Total Expense"
            value={addthousandSeparator(dashboardData?.totalExpense || 0)}
            color=""
          />
        </div>


      <div className='justify-between flex gap-8'>
        <RecentTransaction
          transaction={dashboardData?.recentTransactions}
          onSeeMore = {()=> navigate('/expense')}
       
        />

        <FinancialOverview
          totalBalance={dashboardData?.totalBalance || 0}
          totalIncome ={dashboardData?.totalIncome || 0}
          totalExpense ={dashboardData?.totalExpense || 0}
        />
      </div>

      <div className='flex justify-between gap-8'>
         <ExpenseTransactions
          transaction ={dashboardData?.last30DaysExpenses?.transaction || []}
          onSeeMore={()=> navigate('/expense')}
        />
        
        <Last30DaysExpenses
          data={dashboardData?.last30DaysExpenses?.transaction || []}
        />
      </div>

      <div className='flex justify-between gap-8'>
        <Last60DaysIncome
          data={dashboardData?.last60DaysIncome?.transaction.slice(0,5) || []}
          totalIncome ={dashboardData?.last60DaysIncome?.total || []}
        />

        <Income
          transaction={dashboardData?.last60DaysIncome?.transaction.slice(0,5) || []}
          onSeeMore={()=> navigate('/income')}
        />
      </div>
  </div>

  
    </DashboardLayout>
  )
}
