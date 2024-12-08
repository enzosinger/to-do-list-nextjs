"use client";

import { useState, useEffect } from "react";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  function toggleTheme() {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  }

  return (
    <html lang="en">
      <body className="bg-background text-foreground antialiased">
        <button
          onClick={toggleTheme}
          className="fixed top-4 left-4 p-2 bg-black text-white rounded hover:bg-gray-700 dark:bg-white dark:text-black dark:hover:bg-gray-300"
        >
          {theme === "light" ? "Modo Escuro" : "Modo Claro"}
        </button>
        {children}
      </body>
    </html>
  );
}
