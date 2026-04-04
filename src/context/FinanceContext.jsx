import { createContext, useContext, useEffect, useMemo, useState } from "react";

const FinanceContext = createContext();

const defaultTransactions = [
  {
    id: crypto.randomUUID(),
    type: "income",
    amount: 50000,
    category: "Salary",
    description: "Monthly salary",
    date: "2026-04-01",
    frequency: "monthly",
  },
  {
    id: crypto.randomUUID(),
    type: "expense",
    amount: 4500,
    category: "Groceries",
    description: "Supermarket shopping",
    date: "2026-04-02",
  },
  {
    id: crypto.randomUUID(),
    type: "expense",
    amount: 2200,
    category: "Transportation",
    description: "Fuel and cab",
    date: "2026-04-03",
  },
];

const defaultBudgets = [
  { id: crypto.randomUUID(), category: "Groceries", limit: 10000 },
  { id: crypto.randomUUID(), category: "Transportation", limit: 8000 },
  { id: crypto.randomUUID(), category: "Entertainment", limit: 5000 },
];

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("pft_transactions");
    return saved ? JSON.parse(saved) : defaultTransactions;
  });

  const [budgets, setBudgets] = useState(() => {
    const saved = localStorage.getItem("pft_budgets");
    return saved ? JSON.parse(saved) : defaultBudgets;
  });

  useEffect(() => {
    localStorage.setItem("pft_transactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem("pft_budgets", JSON.stringify(budgets));
  }, [budgets]);

  const addTransaction = (transaction) => {
    setTransactions((prev) => [
      { id: crypto.randomUUID(), ...transaction },
      ...prev,
    ]);
  };

  const addBudget = (budget) => {
    setBudgets((prev) => {
      const exists = prev.find(
        (item) => item.category.toLowerCase() === budget.category.toLowerCase()
      );

      if (exists) {
        return prev.map((item) =>
          item.category.toLowerCase() === budget.category.toLowerCase()
            ? { ...item, limit: Number(budget.limit) }
            : item
        );
      }

      return [
        ...prev,
        {
          id: crypto.randomUUID(),
          category: budget.category,
          limit: Number(budget.limit),
        },
      ];
    });
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((item) => item.id !== id));
  };

  const summary = useMemo(() => {
    const income = transactions
      .filter((item) => item.type === "income")
      .reduce((sum, item) => sum + Number(item.amount), 0);

    const expenses = transactions
      .filter((item) => item.type === "expense")
      .reduce((sum, item) => sum + Number(item.amount), 0);

    return {
      income,
      expenses,
      balance: income - expenses,
    };
  }, [transactions]);

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        budgets,
        addTransaction,
        addBudget,
        deleteTransaction,
        summary,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => useContext(FinanceContext);