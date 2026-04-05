const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const request = async (url, options = {}) => {
  const res = await fetch(url, options);
  const data = await res.json();
  return data;
};

export const register = async (username, email, password) => {
  return request(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });
};

export const login = async (email, password) => {
  return request(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
};

export const forgotPassword = async (email) => {
  return request(`${BASE_URL}/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
};

export const resetPassword = async (token, password) => {
  return request(`${BASE_URL}/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, password }),
  });
};

export const getProfile = async (token) => {
  return request(`${BASE_URL}/users/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getExpenses = async (token) => {
  return request(`${BASE_URL}/expenses`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const addExpense = async (token, amount, category, description, date) => {
  return request(`${BASE_URL}/expenses`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount, category, description, date }),
  });
};

export const deleteExpense = async (token, id) => {
  return request(`${BASE_URL}/expenses/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getIncomes = async (token) => {
  return request(`${BASE_URL}/incomes`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const addIncome = async (token, amount, source, date) => {
  return request(`${BASE_URL}/incomes`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount, source, date }),
  });
};

export const getBudgets = async (token) => {
  return request(`${BASE_URL}/budgets`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const addBudget = async (token, category, limit) => {
  return request(`${BASE_URL}/budgets`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ category, limit }),
  });
};