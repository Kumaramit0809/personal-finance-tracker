import { useState } from "react";
import Card from "../common/Card";
import Input from "../common/Input";
import Button from "../common/Button";
import { EXPENSE_CATEGORIES } from "../../utils/constants";

const capitalize = (val) => val.charAt(0).toUpperCase() + val.slice(1);

const ExpenseForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    amount: "",
    category: EXPENSE_CATEGORIES[0],
    date: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "description" ? capitalize(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      ...form,
      amount: Number(form.amount),
      type: "expense",
      id: Date.now().toString(),
    });
    setForm({
      amount: "",
      category: EXPENSE_CATEGORIES[0],
      date: "",
      description: "",
    });
  };

  return (
    <Card>
      <h3 className="mb-4 text-lg font-semibold">Add Expense</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
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

        <Input label="Category" name="category" value={form.category} onChange={handleChange} required>
          {EXPENSE_CATEGORIES.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </Input>

        <Input label="Date" type="date" name="date" value={form.date} onChange={handleChange} required />

        <Input label="Description (Optional)" name="description" value={form.description} onChange={handleChange} />

        <Button type="submit">Add Expense</Button>
      </form>
    </Card>
  );
};

export default ExpenseForm;