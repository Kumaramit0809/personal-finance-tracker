import { STORAGE_KEYS } from "./constants";

const getData = (key) => JSON.parse(localStorage.getItem(key)) || [];
const setData = (key, value) => localStorage.setItem(key, JSON.stringify(value));

// Users
export const getUsers = () => getData(STORAGE_KEYS.USERS);
export const setUsers = (users) => setData(STORAGE_KEYS.USERS, users);

// Current User
export const getCurrentUser = () =>
  JSON.parse(localStorage.getItem(STORAGE_KEYS.CURRENT_USER)) || null;
export const setCurrentUser = (user) =>
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
export const clearCurrentUser = () =>
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);

// Get user-specific key
const userKey = (key) => {
  const user = getCurrentUser();
  return user ? `${key}_${user.id}` : key;
};

// Expenses (per user)
export const getExpenses = () => getData(userKey(STORAGE_KEYS.EXPENSES));
export const setExpenses = (expenses) => setData(userKey(STORAGE_KEYS.EXPENSES), expenses);

// Incomes (per user)
export const getIncomes = () => getData(userKey(STORAGE_KEYS.INCOMES));
export const setIncomes = (incomes) => setData(userKey(STORAGE_KEYS.INCOMES), incomes);

// Budgets (per user)
export const getBudgets = () => getData(userKey(STORAGE_KEYS.BUDGETS));
export const setBudgets = (budgets) => setData(userKey(STORAGE_KEYS.BUDGETS), budgets);