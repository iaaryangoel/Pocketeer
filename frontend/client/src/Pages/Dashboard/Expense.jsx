import React, { useEffect, useState } from 'react'
import { useUserAuth } from '../../Hooks/useUserAuth';
import { API_PATHS } from '../../Utils/APIpaths';
import toast from 'react-hot-toast';
import axiosInstance from '../../Utils/axiosInstance';
import ExpenseOverview from '../../Components/Expense/ExpenseOverview';
import DashboardLayout from '../../Components/Layouts/DashboardLayout';
import AddExpenseForm from '../../Components/Expense/AddExpenseForm';
import Modal from '../../Components/Layouts/Modal';
import ExpenseList from '../../Components/Expense/ExpenseList';
import DeleteAlert from '../../Components/Layouts/DeleteAlert';

const Expense = () => {

  useUserAuth();

  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    date: null,
  });

  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

  // Get all expense details
  const fetchExpenseDetails = async () => {
    if(loading){return;}

    setLoading(true);
    try{
      const response = await axiosInstance.get(
        `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
      )

      if(response.data){
        setExpenseData(response.data);
      }
    } catch (error){
      console.log("Something went wrong. Please try again.", error);
    } finally{
      setLoading(false);
    }
  };

  // Handle add expense
  const handleAddExpense = async (expense) => {
    const {category, amount, date, icon} = expense;

    // Validation checks
    if(!category.trim()){
      toast.error("Category is required.")
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
        API_PATHS.EXPENSE.ADD_EXPENSE, {
          category, amount, date, icon,
        }
      )
      setOpenAddExpenseModal(false);
      toast.success("Expense Added Successfully!")
      fetchExpenseDetails();
    } catch (error){
      console.error("Error adding expense:", error.response?.data?.message || error.message);
    }
  };

  // Delete expense
  const deleteExpense = async (id) => {
    try{
      await axiosInstance.delete(
        API_PATHS.EXPENSE.DELETE_EXPENSE(id)
      );
      setOpenDeleteAlert({show: false, data: null});
      toast.success("Expense Deleted Successfully!")
      fetchExpenseDetails();
    } catch (error){
      console.error("Error deleting expense:", error.response?.data?.message || error.message);
    }
  };
  
  // Handle download expense details
  const handleDownloadExpenseDetails = async () => {};

  useEffect(() => {
    fetchExpenseDetails();
    return() => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <ExpenseOverview
              transactions={expenseData} 
              onAddExpense={() => setOpenAddExpenseModal(true)}
            />
          </div>

          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => {
              setOpenDeleteAlert({show: true, data: id});     
            }}
            onDownload={handleDownloadExpenseDetails}
          />
        </div>

        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Enter Expense Details"
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({show: false, data: null})}
          title="Delete Expense"
        >
          <DeleteAlert
            content="Are you sure you want to delete?"
            onDelete={() => deleteExpense(openDeleteAlert.data)}
          />
        </Modal> 

      </div>
    </DashboardLayout>
  );
};

export default Expense;
