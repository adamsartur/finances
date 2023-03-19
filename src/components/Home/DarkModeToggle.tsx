import { useState } from "react";

export function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  function toggleDarkMode() {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark");
  }

  return (
    <button onClick={toggleDarkMode}>
      {darkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
