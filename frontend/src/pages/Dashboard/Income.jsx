import React, { useState, useEffect } from "react";
import { DashboardLayout } from "../../components/layouts/DashboardLayout";
import { IncomeOverview } from "../../components/Income/IncomeOverview";
import API_PATHS from "../../utils/apiPaths.js";
import { axiosInstance } from "../../utils/axiosinstance.js";
import { Modal } from "../../components/layouts/Modal";
import { AddIncomeForm } from "../../components/Income/AddIncomeForm";
import { IncomeList } from "../../components/Income/IncomeList";
import { DeletAlert } from "../../components/DeletAlert";
import { useUserAuth } from "../../hooks/useUserAuth";
import {toast} from 'react-hot-toast'
import axios from "axios";

export const Income = () => {
  useUserAuth();
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;

    //Check
    if (!source.trim()) {
      toast.error("Sorce is required");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <=0 ) {
      toast.error("Amount should be valid number greater than 0");
      return;
    }

    if (!date) {
      toast.error("Date is required");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        userId: "69d9397de7192debe3fad404",
        source,
        amount,
        date,
        icon,
      });

      setOpenAddIncomeModal();
      toast.success("Income added Successfully");
      fetchIncomeDetails();
    } catch (error) {
      console.error(
        "Error Adding income",
        error.response?.data?.message || error.message,
      );
      6;
    }
  };

  const fetchIncomeDetails = async () => {
    console.log("🔥 FUNCTION CALLED - fetchIncomeDetails");
    if (loading) return;

    setLoading(true);

    try {
      console.log("📡 Sending API request...");
      const response = await axiosInstance.post(API_PATHS.INCOME.GET_INCOME, {
        userId: "69d9397de7192debe3fad404",
      });

      // const response = await axios.get('http://localhost:8000/api/income/get',
      //   {
      //     params :{
      //       userId:"69d9397de7192debe3fad404"
      //     }
      //   }
      // )
      console.log("INCOME API CALLED");

      console.log("✅ RESPONSE RECEIVED:", response);
      console.log("✅ API RESPONSE:", response);
      console.log("✅ RESPONSE DATA:", response.data);

      if (response.data) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong.Please try again", error);
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("useEffect running");
    fetchIncomeDetails();

    return () => {};
  }, []);

  const deleteIncome = async ({ id }) => {
    try {
      await axios.Instance(API_PATHS.INCOME.DELETE_INCOME);

      setOpenDeleteAlert({ show: false, data: null });
      toast.succes("Income Deleted Succesfully");
      fetchIncomeDetails();
    } catch (error) {
      console.error(
        "Error delting income",
        error.response?.data?.message || errro.message,
      );
    }
  };

  // const handleDownloadIncomeDetails = async () => {};

  const handleDownloadIncomeDetails = async () => {
  try {
    const response = await axiosInstance.get(
      `${API_PATHS.INCOME.DOWNLOAD_INCOME}?userId=69d9397de7192debe3fad404`,
      {
        responseType: "blob",
      }
    );

    const url = window.URL.createObjectURL(
      new Blob([response.data])
    );

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "income_details.xlsx");

    document.body.appendChild(link);
    link.click();
    link.remove();

    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error(error);
    toast.error("Failed to download income details");
  }
};

  

  return (
    <DashboardLayout activeMenu={"Income"}>
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <IncomeOverview
              transaction={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>

          <IncomeList
            transaction={incomeData}
            onDelete={(id) => {
              setOpenDeleteAlert({ show: true, data: id });
            }}
            onDownload={handleDownloadIncomeDetails}
          />
        </div>

        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Income"
        >
          <DeletAlert
            content="Are you sure to delete this income"
            onDelete={() => deleteIncome(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};
