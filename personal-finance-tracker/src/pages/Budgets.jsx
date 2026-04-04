import { useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import BudgetForm from "../components/forms/BudgetForm";
import BudgetProgress from "../components/dashboard/BudgetProgress";
import { getBudgets, getExpenses, setBudgets } from "../utils/storage";

const Budgets = () => {
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
    <AppLayout title="Budgets">
      <div className="grid gap-6 xl:grid-cols-2">
        <BudgetForm onAdd={handleAddBudget} />
        <div>
          <h2 className="mb-4 text-xl font-bold text-slate-800">Monthly Budget Progress</h2>
          <BudgetProgress budgets={budgets} expenses={expenses} />
        </div>
      </div>
    </AppLayout>
  );
};

export default Budgets;