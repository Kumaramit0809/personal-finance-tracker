

import Card from "../common/Card";
import { formatCurrency } from "../../utils/formatters";
import EmptyState from "../common/EmptyState";

const BudgetProgress = ({ budgets = [], expenses = [] }) => {
  const currentMonth = new Date().toISOString().slice(0, 7);

  const monthlyBudgets = budgets.filter((b) => {
    if (!b.month) return true;
    return b.month === currentMonth;
  });

  if (!monthlyBudgets.length) {
    return <EmptyState message="No budgets set for this month yet." />;
  }

  return (
    <div className="space-y-4">
      {monthlyBudgets.map((budget) => {
        const spent = expenses
          .filter((e) => {
            const sameCategory = e.category === budget.category;

            if (budget.month) {
              return sameCategory && e.date?.slice(0, 7) === budget.month;
            }

            return sameCategory;
          })
          .reduce((sum, item) => sum + Number(item.amount || 0), 0);

        const budgetAmount =
          Number(
            budget.amount ??
            budget.budget ??
            budget.limit ??
            budget.monthlyBudget ??
            0
          ) || 0;

        const percentage =
          budgetAmount > 0 ? Math.min((spent / budgetAmount) * 100, 100) : 0;

        const exceeded = budgetAmount > 0 && spent > budgetAmount;

        return (
          <Card key={budget._id || budget.id || budget.category}>
            <div className="mb-3 flex items-center justify-between">
              <h4 className="font-semibold text-slate-800">{budget.category}</h4>
              <span className="text-sm text-slate-500">
                {formatCurrency(spent)} / {formatCurrency(budgetAmount)}
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
              {budgetAmount === 0
                ? "Budget amount missing"
                : exceeded
                ? "Budget exceeded"
                : `${percentage.toFixed(0)}% used`}
            </p>
          </Card>
        );
      })}
    </div>
  );
};

export default BudgetProgress;