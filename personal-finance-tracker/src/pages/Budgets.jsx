import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import BudgetForm from "../components/forms/BudgetForm";
import BudgetProgress from "../components/dashboard/BudgetProgress";
import { getBudgets, getExpenses, setBudgets } from "../utils/storage";

const Budgets = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [budgets, setBudgetsState] = useState(getBudgets());
  const expenses = getExpenses();

  const handleAddBudget = (budget) => {
    const existingIndex = budgets.findIndex(
      (b) => b.category === budget.category && b.month === budget.month
    );

    let updated = [...budgets];

    if (existingIndex !== -1) {
      updated[existingIndex] = { ...updated[existingIndex], amount: budget.amount };
    } else {
      updated.push(budget);
    }

    setBudgets(updated);
    setBudgetsState(updated);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="space-y-6 p-4 md:p-6">
          <div className="grid gap-6 xl:grid-cols-2">
            <BudgetForm onAdd={handleAddBudget} />
            <div>
              <h2 className="mb-4 text-xl font-bold text-slate-800">Monthly Budget Progress</h2>
              <BudgetProgress budgets={budgets} expenses={expenses} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Budgets;