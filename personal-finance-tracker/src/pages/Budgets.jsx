import { useState, useEffect } from "react";
import AppLayout from "../components/layout/AppLayout";
import BudgetForm from "../components/forms/BudgetForm";
import BudgetProgress from "../components/dashboard/BudgetProgress";
import { getBudgets, addBudget, getExpenses } from "../utils/api";
import { useAuth } from "../context/AuthContext";

const Budgets = () => {
  const { token } = useAuth();
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    setLoading(true);
    const [b, e] = await Promise.all([getBudgets(token), getExpenses(token)]);
    if (b.success) setBudgets(b.budgets);
    if (e.success) setExpenses(e.expenses);
    setLoading(false);
  };

  useEffect(() => { fetchAll(); }, []);

  const handleAddBudget = async (budget) => {
    const res = await addBudget(token, budget.category, budget.amount);
    if (res.success) fetchAll();
  };

  return (
    <AppLayout title="Budgets">
      <div className="grid gap-6 xl:grid-cols-2">
        <BudgetForm onAdd={handleAddBudget} />
        <div>
          <h2 className="mb-4 text-xl font-bold text-slate-800">Monthly Budget Progress</h2>
          {loading ? (
            <div className="py-10 text-center text-sm text-slate-400">Loading...</div>
          ) : (
            <BudgetProgress budgets={budgets} expenses={expenses} />
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Budgets;