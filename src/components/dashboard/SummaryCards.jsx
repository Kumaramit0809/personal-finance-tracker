import Card from "../common/Card";
import { formatCurrency } from "../../utils/formatters";

const SummaryCards = ({ incomeTotal, expenseTotal }) => {
  const balance = incomeTotal - expenseTotal;

  const cards = [
    { title: "Total Income", value: incomeTotal },
    { title: "Total Expenses", value: expenseTotal },
    { title: "Net Balance", value: balance },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => (
        <Card key={card.title}>
          <p className="text-sm text-slate-500">{card.title}</p>
          <h3 className="mt-2 text-2xl font-bold text-slate-800">
            {formatCurrency(card.value)}
          </h3>
        </Card>
      ))}
    </div>
  );
};

export default SummaryCards;