import { useMemo, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import ExpenseForm from "../components/forms/ExpenseForm";
import IncomeForm from "../components/forms/IncomeForm";
import SummaryCards from "../components/dashboard/SummaryCards";
import BudgetProgress from "../components/dashboard/BudgetProgress";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import { getBudgets, getExpenses, getIncomes, setExpenses, setIncomes } from "../utils/storage";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expenses, setExpensesState] = useState(getExpenses());
  const [incomes, setIncomesState] = useState(getIncomes());
  const budgets = getBudgets();

  const handleAddExpense = (expense) => {
    const updated = [...expenses, expense];
    setExpenses(updated);
    setExpensesState(updated);
  };

  const handleAddIncome = (income) => {
    const updated = [...incomes, income];
    setIncomes(updated);
    setIncomesState(updated);
  };

  const incomeTotal = useMemo(
    () => incomes.reduce((sum, item) => sum + Number(item.amount), 0),
    [incomes]
  );

  const expenseTotal = useMemo(
    () => expenses.reduce((sum, item) => sum + Number(item.amount), 0),
    [expenses]
  );

  const transactions = [...expenses, ...incomes];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="space-y-6 p-4 md:p-6">
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
        </main>
      </div>
    </div>
  );
};

export default Dashboard;