import { useState } from "react";
import Card from "../common/Card";
import Input from "../common/Input";
import Button from "../common/Button";
import { EXPENSE_CATEGORIES } from "../../utils/constants";

const BudgetForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    category: EXPENSE_CATEGORIES[0],
    amount: "",
    month: new Date().toISOString().slice(0, 7),
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      ...form,
      amount: Number(form.amount),
      id: Date.now().toString(),
    });
    setForm({
      category: EXPENSE_CATEGORIES[0],
      amount: "",
      month: new Date().toISOString().slice(0, 7),
    });
  };

  return (
    <Card>
      <h3 className="mb-4 text-lg font-semibold">Set Monthly Budget</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Category" name="category" value={form.category} onChange={handleChange}>
          {EXPENSE_CATEGORIES.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </Input>
        <Input label="Budget Amount" type="number" name="amount" value={form.amount} onChange={handleChange} required />
        <Input label="Month" type="month" name="month" value={form.month} onChange={handleChange} required />
        <Button type="submit">Save Budget</Button>
      </form>
    </Card>
  );
};

export default BudgetForm;