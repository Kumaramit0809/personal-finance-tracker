import { useState } from "react";
import Card from "../common/Card";
import Input from "../common/Input";
import Button from "../common/Button";
import { INCOME_FREQUENCIES } from "../../utils/constants";

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
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
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
        <Input label="Income Source" name="source" value={form.source} onChange={handleChange} required />
        <Input label="Amount" type="number" name="amount" value={form.amount} onChange={handleChange} required />
        <Input label="Frequency" name="frequency" value={form.frequency} onChange={handleChange} required>
          {INCOME_FREQUENCIES.map((freq) => (
            <option key={freq}>{freq}</option>
          ))}
        </Input>
        <Input label="Date" type="date" name="date" value={form.date} onChange={handleChange} required />
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