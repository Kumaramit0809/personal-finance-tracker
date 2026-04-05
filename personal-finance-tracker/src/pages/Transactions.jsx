import { useMemo, useState, useEffect } from "react";
import AppLayout from "../components/layout/AppLayout";
import Card from "../components/common/Card";
import Input from "../components/common/Input";
import EmptyState from "../components/common/EmptyState";
import { getExpenses, getIncomes, deleteExpense } from "../utils/api";
import { useAuth } from "../context/AuthContext";
import { formatCurrency, formatDate } from "../utils/formatters";
import { Trash2 } from "lucide-react";

const Transactions = () => {
  const { token } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [amountMin, setAmountMin] = useState("");
  const [amountMax, setAmountMax] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const fetchAll = async () => {
    setLoading(true);
    const [e, i] = await Promise.all([getExpenses(token), getIncomes(token)]);
    if (e.success) setExpenses(e.expenses.map(x => ({ ...x, type: "expense" })));
    if (i.success) setIncomes(i.incomes.map(x => ({ ...x, type: "income" })));
    setLoading(false);
  };

  useEffect(() => { fetchAll(); }, []);

  const handleDelete = async (id) => {
    await deleteExpense(token, id);
    fetchAll();
  };

  const transactions = useMemo(() => {
    return [...expenses, ...incomes]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .filter((item) => {
        const matchesType = filter === "all" || item.type === filter;
        const label = item.type === "expense" ? item.category : item.source;
        const matchesSearch = (label || "").toLowerCase().includes(search.toLowerCase());
        const matchesMin = amountMin === "" || Number(item.amount) >= Number(amountMin);
        const matchesMax = amountMax === "" || Number(item.amount) <= Number(amountMax);
        // Fix: compare date strings directly to avoid timezone off-by-one issues
        const itemDate = item.date?.slice(0, 10) ?? "";
        const matchesFrom = dateFrom === "" || itemDate >= dateFrom;
        const matchesTo = dateTo === "" || itemDate <= dateTo;
        return matchesType && matchesSearch && matchesMin && matchesMax && matchesFrom && matchesTo;
      });
  }, [expenses, incomes, search, filter, amountMin, amountMax, dateFrom, dateTo]);

  const handleReset = () => {
    setSearch(""); setFilter("all"); setAmountMin(""); setAmountMax(""); setDateFrom(""); setDateTo("");
  };

  return (
    <AppLayout title="Transactions">
      <div className="space-y-6">
        <Card>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <Input
              label="Search by Category / Source"
              value={search}
              onChange={(e) => {
                const val = e.target.value;
                setSearch(val.charAt(0).toUpperCase() + val.slice(1));
              }}
              placeholder="e.g. Groceries, Salary"
            />
            <Input label="Filter by Type" value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All</option>
              <option value="expense">Expenses</option>
              <option value="income">Income</option>
            </Input>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Min Amount</label>
              <div className="relative">
                {!amountMin && <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">₹</span>}
                <input type="number" value={amountMin} onChange={(e) => setAmountMin(e.target.value)} min="0"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Max Amount</label>
              <div className="relative">
                {!amountMax && <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">₹</span>}
                <input type="number" value={amountMax} onChange={(e) => setAmountMax(e.target.value)} min="0"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
              </div>
            </div>

            <Input label="Date From" type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
            <Input label="Date To" type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
          </div>
          <div className="mt-4 flex justify-end">
            <button onClick={handleReset}
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 transition cursor-pointer">
              Reset Filters
            </button>
          </div>
        </Card>

        <Card>
          <h2 className="mb-4 text-xl font-bold text-slate-800">Transaction History</h2>
          {loading ? (
            <div className="py-10 text-center text-sm text-slate-400">Loading...</div>
          ) : !transactions.length ? (
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
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((item) => (
                    <tr key={`${item.type}-${item.id}`} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                          item.type === "expense" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
                        }`}>
                          {item.type === "expense" ? "Expense" : "Income"}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-medium text-slate-800">
                        {item.type === "expense" ? item.category : item.source}
                      </td>
                      <td className="px-4 py-3 text-slate-500">{formatDate(item.date)}</td>
                      <td className="px-4 py-3 text-slate-500">
                        {item.type === "expense"
                          ? item.description || "-"
                          : `${item.frequency || "One-time"}${item.recurring ? " • Recurring" : ""}`}
                      </td>
                      <td className={`px-4 py-3 font-semibold ${item.type === "expense" ? "text-red-600" : "text-green-600"}`}>
                        {item.type === "expense" ? "-" : "+"}{formatCurrency(item.amount)}
                      </td>
                      <td className="px-4 py-3">
                        {item.type === "expense" && (
                          <button onClick={() => handleDelete(item.id)}
                            className="text-slate-400 hover:text-red-500 transition cursor-pointer">
                            <Trash2 size={16} />
                          </button>
                        )}
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
