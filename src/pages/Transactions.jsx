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
  const [amountMin, setAmountMin] = useState("");
  const [amountMax, setAmountMax] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

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

      const matchesMin = amountMin === "" ? true : Number(item.amount) >= Number(amountMin);
      const matchesMax = amountMax === "" ? true : Number(item.amount) <= Number(amountMax);

      const itemDate = new Date(item.date);
      const matchesFrom = dateFrom === "" ? true : itemDate >= new Date(dateFrom);
      const matchesTo = dateTo === "" ? true : itemDate <= new Date(dateTo);

      return matchesType && matchesSearch && matchesMin && matchesMax && matchesFrom && matchesTo;
    });
  }, [expenses, incomes, search, filter, amountMin, amountMax, dateFrom, dateTo]);

  const handleReset = () => {
    setSearch("");
    setFilter("all");
    setAmountMin("");
    setAmountMax("");
    setDateFrom("");
    setDateTo("");
  };

  return (
    <AppLayout title="Transactions">
      <div className="space-y-6">

        {/* Filters */}
        <Card>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <Input
              label="Search by Category / Source"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="e.g. Groceries, Salary"
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

            {/* Min Amount */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Min Amount</label>
              <div className="relative">
                {!amountMin && (
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">₹</span>
                )}
                <input
                  type="number"
                  value={amountMin}
                  onChange={(e) => setAmountMin(e.target.value)}
                  min="0"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* Max Amount */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Max Amount</label>
              <div className="relative">
                {!amountMax && (
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">₹</span>
                )}
                <input
                  type="number"
                  value={amountMax}
                  onChange={(e) => setAmountMax(e.target.value)}
                  min="0"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            <Input
              label="Date From"
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
            <Input
              label="Date To"
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />
          </div>

          {/* Reset Button */}
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleReset}
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 transition cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        </Card>

        {/* Table */}
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