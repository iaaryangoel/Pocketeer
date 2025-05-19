import React, { useEffect, useState } from "react";
import DashboardLayout from "../../Components/Layouts/DashboardLayout";
import IncomeOverview from "../../Components/Income/IncomeOverview";
import axiosInstance from "../../Utils/axiosInstance";
import { API_PATHS } from "../../Utils/APIpaths";
import Modal from "../../Components/Layouts/Modal";
import AddIncomeForm from "../../Components/Income/AddIncomeForm";
import {toast} from "react-hot-toast"

const Income = () => {

  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    date: null,
  });

  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  // Get all income details
  const fetchIncomeDetails = async () => {
    if(loading){return;}

    setLoading(true);
    try{
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      )

      if(response.data){
        setIncomeData(response.data);
      }
    } catch (error){
      console.log("Something went wrong. Please try again.", error);
    } finally{
      setLoading(false);
    }
  };

  // Handle add income
  const handleAddIncome = async (income) => {
    const {source, amount, date, icon} = income;

    // Validation checks
    if(!source.trim()){
      toast.error("Source is required.")
      return;
    }
    if(!amount || isNaN(amount) || Number(amount) <= 0){
      toast.error("Amount should be a valid number greater than 0.")
      return;
    }
    if(!date){
      toast.error("Date is required.")
      return;
    }

    try{
      await axiosInstance.post(
        API_PATHS.INCOME.AD_INCOME, {
          source, amount, date, icon,
        }
      )
      setOpenAddIncomeModal(false);
      toast.success("Income Added Successfully!")
      fetchIncomeDetails();
    } catch (error){
      console.error("Error adding income:", error.response?.data?.message || error.message);
    }
  };

  // Delete Income
  const deleteIncome = async (id) => {};
  
  // Handle download income details
  const handleDownloadIncomeDetails = async () => {};

  useEffect(() => {
    fetchIncomeDetails();
    return() => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <IncomeOverview
              transactions={incomeData} 
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>
        </div>

        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Enter Income Details"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Income;
