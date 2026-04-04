import { useMemo, useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import ExpenseForm from "../components/forms/ExpenseForm";
import IncomeForm from "../components/forms/IncomeForm";
import SummaryCards from "../components/dashboard/SummaryCards";
import BudgetProgress from "../components/dashboard/BudgetProgress";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import { getBudgets, getExpenses, getIncomes, setExpenses, setIncomes } from "../utils/storage";

const Dashboard = () => {
  const [expenses, setExpensesState] = useState(getExpenses());
  const [incomes, setIncomesState] = useState(getIncomes());
  const budgets = getBudgets();

  // Popup state
  const [confirmModal, setConfirmModal] = useState(null); // { type, data }
  const [warningModal, setWarningModal] = useState(null); // { message }

  const incomeTotal = useMemo(
    () => incomes.reduce((sum, item) => sum + Number(item.amount), 0),
    [incomes]
  );

  const expenseTotal = useMemo(
    () => expenses.reduce((sum, item) => sum + Number(item.amount), 0),
    [expenses]
  );

  const transactions = [...expenses, ...incomes];

  // Called when user clicks Add Expense
  const handleAddExpense = (expense) => {
    const newBalance = incomeTotal - expenseTotal - Number(expense.amount);

    if (newBalance < 0) {
      // Show confirm + warn about negative balance
      setConfirmModal({
        type: "expense",
        data: expense,
        warning: true,
      });
    } else {
      setConfirmModal({ type: "expense", data: expense, warning: false });
    }
  };

  // Called when user clicks Add Income
  const handleAddIncome = (income) => {
    setConfirmModal({ type: "income", data: income, warning: false });
  };

  // User confirmed
  const handleConfirm = () => {
    const { type, data } = confirmModal;
    if (type === "expense") {
      const updated = [...expenses, data];
      setExpenses(updated);
      setExpensesState(updated);
    } else {
      const updated = [...incomes, data];
      setIncomes(updated);
      setIncomesState(updated);
    }
    setConfirmModal(null);
  };

  // User cancelled
  const handleCancel = () => {
    setConfirmModal(null);
  };

  return (
    <AppLayout title="Dashboard">
      <div className="space-y-6">
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
          <RecentTransactions transactions={transactions} />
        </div>
      </div>

      {/* Confirmation Popup */}
      {confirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">

            {/* Warning banner */}
            {confirmModal.warning && (
              <div className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600 font-medium">
                ⚠️ Warning: Adding this expense will make your net balance negative!
              </div>
            )}

            <h2 className="mb-2 text-lg font-bold text-slate-800">
              {confirmModal.type === "expense" ? "Add Expense?" : "Add Income?"}
            </h2>
            <p className="mb-6 text-sm text-slate-500">
              Are you sure you want to add this{" "}
              <span className="font-medium text-slate-700">
                {confirmModal.type === "expense"
                  ? `₹${confirmModal.data.amount} expense`
                  : `₹${confirmModal.data.amount} income`}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                className="flex-1 rounded-xl border border-slate-300 py-2 text-sm text-slate-600 hover:bg-slate-100 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className={`flex-1 rounded-xl py-2 text-sm font-medium text-white transition cursor-pointer ${
                  confirmModal.warning
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-blue-600 hover:bg-blue-700"
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