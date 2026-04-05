import { useEffect, useState, useMemo } from "react";
import {
  getExpenses, addExpense, deleteExpense,
  getIncomes, addIncome,
  getBudgets, addBudget,
} from "../utils/api";
import { useAuth } from "../context/AuthContext";
import AppLayout from "../components/layout/AppLayout";
import SummaryCards from "../components/dashboard/SummaryCards";
import BudgetProgress from "../components/dashboard/BudgetProgress";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import ExpenseForm from "../components/forms/ExpenseForm";
import IncomeForm from "../components/forms/IncomeForm";

const Dashboard = () => {
  const { token } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [confirmModal, setConfirmModal] = useState(null);
  const [loadingData, setLoadingData] = useState(true);

  const fetchAll = async () => {
    setLoadingData(true);
    const [e, i, b] = await Promise.all([
      getExpenses(token),
      getIncomes(token),
      getBudgets(token),
    ]);
    if (e.success) setExpenses(e.expenses);
    if (i.success) setIncomes(i.incomes);
    if (b.success) setBudgets(b.budgets);
    setLoadingData(false);
  };

  useEffect(() => { fetchAll(); }, []);

  const incomeTotal = useMemo(() => incomes.reduce((s, i) => s + Number(i.amount), 0), [incomes]);
  const expenseTotal = useMemo(() => expenses.reduce((s, e) => s + Number(e.amount), 0), [expenses]);
  const transactions = useMemo(() => [...expenses.map(e => ({ ...e, type: "expense" })), ...incomes.map(i => ({ ...i, type: "income" }))], [expenses, incomes]);

  const handleAddExpense = (expense) => {
    const newBalance = incomeTotal - expenseTotal - Number(expense.amount);
    setConfirmModal({ type: "expense", data: expense, warning: newBalance < 0 });
  };

  const handleAddIncome = (income) => {
    setConfirmModal({ type: "income", data: income, warning: false });
  };

  const handleConfirm = async () => {
    const { type, data } = confirmModal;
    if (type === "expense") {
      await addExpense(token, data.amount, data.category, data.description, data.date);
    } else {
      await addIncome(token, data.amount, data.source, data.date);
    }
    setConfirmModal(null);
    fetchAll();
  };

  const handleDeleteExpense = async (id) => {
    await deleteExpense(token, id);
    fetchAll();
  };

  return (
    <AppLayout title="Dashboard">
      <div className="space-y-6">
        {loadingData ? (
          <div className="flex items-center justify-center py-20 text-slate-400 text-sm">Loading...</div>
        ) : (
          <>
            <SummaryCards incomeTotal={incomeTotal} expenseTotal={expenseTotal} />

            <div className="grid gap-6 xl:grid-cols-2">
              <ExpenseForm onAdd={handleAddExpense} />
              <IncomeForm onAdd={handleAddIncome} />
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              <div>
                <h2 className="mb-4 text-xl font-bold text-slate-800">Budget Overview</h2>
                <BudgetProgress budgets={budgets} expenses={expenses} />
              </div>
              <RecentTransactions
                transactions={transactions}
                onDeleteExpense={handleDeleteExpense}
              />
            </div>
          </>
        )}
      </div>

      {/* Confirmation Modal */}
      {confirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            {confirmModal.warning && (
              <div className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600 font-medium">
                ⚠️ Warning: Adding this expense will make your net balance negative!
              </div>
            )}
            <h2 className="mb-2 text-lg font-bold text-slate-800">
              {confirmModal.type === "expense" ? "Add Expense?" : "Add Income?"}
            </h2>
            <p className="mb-6 text-sm text-slate-500">
              Are you sure you want to add{" "}
              <span className="font-medium text-slate-700">₹{confirmModal.data.amount}</span>?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmModal(null)}
                className="flex-1 rounded-xl border border-slate-300 py-2 text-sm text-slate-600 hover:bg-slate-100 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className={`flex-1 rounded-xl py-2 text-sm font-medium text-white transition cursor-pointer ${
                  confirmModal.warning ? "bg-red-500 hover:bg-red-600" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                Yes, Add It
              </button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
};

export default Dashboard;