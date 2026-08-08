import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
const KEY = "shineu_user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = localStorage.getItem(KEY);
    if (raw) setUser(JSON.parse(raw));
    setLoading(false);
  }, []);

  const login = (email) => {
    const u = { name: "Rohan Sharma", email };
    localStorage.setItem(KEY, JSON.stringify(u));
    setUser(u);
    return u;
  };

  const register = (name, email) => {
    const u = { name, email };
    localStorage.setItem(KEY, JSON.stringify(u));
    setUser(u);
    return u;
  };

  const logout = () => {
    localStorage.removeItem(KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthDemo = () => useContext(AuthContext);