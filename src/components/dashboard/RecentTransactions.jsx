import Card from "../common/Card";
import EmptyState from "../common/EmptyState";
import { formatCurrency, formatDate } from "../../utils/formatters";

const RecentTransactions = ({ transactions }) => {
  const recent = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  if (!recent.length) {
    return <EmptyState message="No transactions available yet." />;
  }

  return (
    <Card>
      <h3 className="mb-4 text-lg font-semibold">Recent Transactions</h3>
      <div className="space-y-3">
        {recent.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-xl border border-slate-200 p-3"
          >
            <div>
              <p className="font-medium text-slate-800">
                {item.type === "expense" ? item.category : item.source}
              </p>
              <p className="text-sm text-slate-500">{formatDate(item.date)}</p>
            </div>
            <p
              className={`font-semibold ${
                item.type === "expense" ? "text-red-600" : "text-green-600"
              }`}
            >
              {item.type === "expense" ? "-" : "+"}
              {formatCurrency(item.amount)}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecentTransactions;