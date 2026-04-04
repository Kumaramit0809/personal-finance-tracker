import { STORAGE_KEYS } from "./constants";

const getData = (key) => JSON.parse(localStorage.getItem(key)) || [];
const setData = (key, value) => localStorage.setItem(key, JSON.stringify(value));

export const getUsers = () => getData(STORAGE_KEYS.USERS);
export const setUsers = (users) => setData(STORAGE_KEYS.USERS, users);

export const getCurrentUser = () =>
  JSON.parse(localStorage.getItem(STORAGE_KEYS.CURRENT_USER)) || null;
export const setCurrentUser = (user) =>
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
export const clearCurrentUser = () =>
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);

export const getExpenses = () => getData(STORAGE_KEYS.EXPENSES);
export const setExpenses = (expenses) => setData(STORAGE_KEYS.EXPENSES, expenses);

export const getIncomes = () => getData(STORAGE_KEYS.INCOMES);
export const setIncomes = (incomes) => setData(STORAGE_KEYS.INCOMES, incomes);

export const getBudgets = () => getData(STORAGE_KEYS.BUDGETS);
export const setBudgets = (budgets) => setData(STORAGE_KEYS.BUDGETS, budgets);