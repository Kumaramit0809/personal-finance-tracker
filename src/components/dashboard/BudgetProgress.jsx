import Card from "../common/Card";
import { formatCurrency } from "../../utils/formatters";
import EmptyState from "../common/EmptyState";

const BudgetProgress = ({ budgets, expenses }) => {
  const currentMonth = new Date().toISOString().slice(0, 7);
  const monthlyBudgets = budgets.filter((b) => b.month === currentMonth);

  if (!monthlyBudgets.length) {
    return <EmptyState message="No budgets set for this month yet." />;
  }

  return (
    <div className="space-y-4">
      {monthlyBudgets.map((budget) => {
        const spent = expenses
          .filter(
            (e) =>
              e.category === budget.category &&
              e.date?.slice(0, 7) === budget.month
          )
          .reduce((sum, item) => sum + Number(item.amount), 0);

        const percentage = Math.min((spent / budget.amount) * 100, 100);
        const exceeded = spent > budget.amount;

        return (
          <Card key={budget.id}>
            <div className="mb-3 flex items-center justify-between">
              <h4 className="font-semibold text-slate-800">{budget.category}</h4>
              <span className="text-sm text-slate-500">
                {formatCurrency(spent)} / {formatCurrency(budget.amount)}
              </span>
            </div>

            <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  exceeded ? "bg-red-500" : "bg-blue-600"
                }`}
                style={{ width: `${percentage}%` }}
              />
            </div>

            <p className={`mt-2 text-sm ${exceeded ? "text-red-600" : "text-slate-500"}`}>
              {exceeded ? "Budget exceeded" : `${percentage.toFixed(0)}% used`}
            </p>
          </Card>
        );
      })}
    </div>
  );
};

export default BudgetProgress;