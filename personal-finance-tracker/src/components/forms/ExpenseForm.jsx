import { useState } from "react";
import Card from "../common/Card";
import Input from "../common/Input";
import Button from "../common/Button";
import { EXPENSE_CATEGORIES } from "../../utils/constants";

const ExpenseForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    amount: "",
    category: EXPENSE_CATEGORIES[0],
    date: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
        <Input label="Amount" type="number" name="amount" value={form.amount} onChange={handleChange} required />
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