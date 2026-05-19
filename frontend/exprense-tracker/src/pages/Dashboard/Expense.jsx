import React, { useState, useEffect } from "react";
import { DashboardLayout } from "../../components/layouts/DashboardLayout";
import API_PATHS from "../../utils/apiPaths.js";
import { axiosInstance } from "../../utils/axiosinstance.js";
import { useUserAuth } from "../../hooks/useUserAuth";
import {ExpenseOverview} from '../../components/Expense/ExpenseOverview'
import {ExpenseList} from '../../components/Expense/ExpenseList'
import {Modal} from '../../components/layouts/Modal'
import {AddExpenseForm} from '../../components/Expense/AddExpenseForm'
import {toast} from 'react-hot-toast'
// import axios from "axios";

export const Expense = () => {
  useUserAuth();
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;

    //Check
    if (!category.trim()) {
      toast.error("category is required");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <=0) {
      toast.error("Amount should be valid number greater than 0");
      return;
    }

    if (!date) {
      toast.error("Date is required");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        userId :'69d9397de7192debe3fad404',
        category,
        amount,
        date,
        icon,
      });

      setOpenAddExpenseModal(false);
      toast.success("Expense added Successfully");
      fetchExpenseDetails();
    } catch (error) {
      console.error(
        "Error Adding expense",
        error.response?.data?.message || error.message,
      );
      toast.error(error.reponse?.message)
    }
  };

  useEffect(() => {
    console.log("useEffect running");
    fetchExpenseDetails();

    return () => {};
  }, []);

  const fetchExpenseDetails = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.post(API_PATHS.EXPENSE.GET_EXPENSE, {
        userId: "69d9397de7192debe3fad404",
      });

      console.log("Expense APi called");

      if (response.data) {
        setExpenseData(response.data);
      }

      console.log(response.data);
    } catch (error) {
      console.log("Something went wrong.Please try again", error);
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteExpense = () => {};
   const handleDownloadExpenseDetails = async () => {};

  return (
    <DashboardLayout activeMenu={"Expense"}>
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <ExpenseOverview
              transaction={expenseData}
              onAddExpense={() => setOpenAddExpenseModal(true)}
            />
          </div>

          <ExpenseList
            transaction={expenseData}
            onDelete={(id) => {
              setOpenDeleteAlert({ show: true, data: id });
            }}
            onDownload={handleDownloadExpenseDetails}
          />
        </div>




        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expense"
          >
          <AddExpenseForm onAddExpense={handleAddExpense}/>
        </Modal>
      </div>
    </DashboardLayout>
  );
};
