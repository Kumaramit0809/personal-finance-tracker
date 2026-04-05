import { createContext, useContext, useEffect, useState } from "react";
import {
  clearCurrentUser,
  getCurrentUser,
  getUsers,
  setCurrentUser,
  setUsers,
} from "../utils/storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const current = getCurrentUser();
    setUser(current);
    setLoading(false);
  }, []);

  const register = ({ name, email, password }) => {
    const users = getUsers();
    const exists = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (exists) {
      throw new Error("User already exists with this email.");
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password, // frontend demo only
      verified: true, // simulated email verification
    };

    const updated = [...users, newUser];
    setUsers(updated);
    return true;
  };

  const login = ({ email, password }) => {
    const users = getUsers();
    const found = users.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() &&
        u.password === password
    );

    if (!found) {
      throw new Error("Invalid email or password.");
    }

    if (!found.verified) {
      throw new Error("Email is not verified.");
    }

    const safeUser = {
      id: found.id,
      name: found.name,
      email: found.email,
    };

    setCurrentUser(safeUser);
    setUser(safeUser);
  };

  const logout = () => {
    clearCurrentUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);