import { useState } from "react";
import Card from "../common/Card";
import Button from "../common/Button";
import { INCOME_FREQUENCIES } from "../../utils/constants";

const capitalize = (val) => val.charAt(0).toUpperCase() + val.slice(1);

const IncomeForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    source: "",
    amount: "",
    frequency: INCOME_FREQUENCIES[0],
    recurring: false,
    date: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "source" && !/^[a-zA-Z\s]*$/.test(value)) return;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : name === "source" ? capitalize(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      ...form,
      amount: Number(form.amount),
      type: "income",
      id: Date.now().toString(),
    });
    setForm({
      source: "",
      amount: "",
      frequency: INCOME_FREQUENCIES[0],
      recurring: false,
      date: "",
    });
  };

  return (
    <Card>
      <h3 className="mb-4 text-lg font-semibold">Add Income</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">Income Source</label>
          <input
            type="text"
            name="source"
            value={form.source}
            onChange={handleChange}
            placeholder="e.g. Salary, Freelance"
            required
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">Amount</label>
          <div className="relative">
            {!form.amount && (
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">₹</span>
            )}
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              required
              min="0"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">Frequency</label>
          <select
            name="frequency"
            value={form.frequency}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            {INCOME_FREQUENCIES.map((freq) => (
              <option key={freq}>{freq}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <input
            type="checkbox"
            name="recurring"
            checked={form.recurring}
            onChange={handleChange}
            className="h-4 w-4 rounded"
          />
          Recurring Income
        </label>

        <Button type="submit">Add Income</Button>
      </form>
    </Card>
  );
};

export default IncomeForm;