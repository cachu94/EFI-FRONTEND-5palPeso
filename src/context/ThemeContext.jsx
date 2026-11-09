import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [tema, setTema] = useState(() => {
    return localStorage.getItem("tema") || "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (tema === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("tema", tema);
  }, [tema]);

  const cambiarTema = () => {
    setTema((prevTema) => (prevTema === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ tema, cambiarTema }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTema() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTema must be used within a ThemeProvider");
  }
  return context;
}
