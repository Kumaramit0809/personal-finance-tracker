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
    </AppLayout>
  );
};

export default Dashboard;