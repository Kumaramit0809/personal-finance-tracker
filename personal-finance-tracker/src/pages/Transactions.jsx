import { useMemo, useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import Card from "../components/common/Card";
import Input from "../components/common/Input";
import EmptyState from "../components/common/EmptyState";
import { getExpenses, getIncomes } from "../utils/storage";
import { formatCurrency, formatDate } from "../utils/formatters";

const Transactions = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const expenses = getExpenses();
  const incomes = getIncomes();

  const transactions = useMemo(() => {
    const merged = [...expenses, ...incomes].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    return merged.filter((item) => {
      const matchesType = filter === "all" ? true : item.type === filter;
      const label = item.type === "expense" ? item.category : item.source;
      const matchesSearch = label.toLowerCase().includes(search.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [expenses, incomes, search, filter]);

  return (
    <AppLayout title="Transactions">
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Search Transactions"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by category or source"
          />
          <Input
            label="Filter by Type"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="expense">Expenses</option>
            <option value="income">Income</option>
          </Input>
        </div>

        <Card>
          <h2 className="mb-4 text-xl font-bold text-slate-800">Transaction History</h2>
          {!transactions.length ? (
            <EmptyState message="No transactions found for the selected filters." />
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Title</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Details</th>
                    <th className="px-4 py-3">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((item) => (
                    <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="px-4 py-3 capitalize">{item.type}</td>
                      <td className="px-4 py-3">
                        {item.type === "expense" ? item.category : item.source}
                      </td>
                      <td className="px-4 py-3">{formatDate(item.date)}</td>
                      <td className="px-4 py-3">
                        {item.type === "expense"
                          ? item.description || "-"
                          : `${item.frequency}${item.recurring ? " • Recurring" : ""}`}
                      </td>
                      <td className={`px-4 py-3 font-semibold ${item.type === "expense" ? "text-red-600" : "text-green-600"}`}>
                        {item.type === "expense" ? "-" : "+"}
                        {formatCurrency(item.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </AppLayout>
  );
};

export default Transactions;