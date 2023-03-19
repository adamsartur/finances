import { createContext } from "react";
import React, { useEffect, useRef, useState } from "react";

interface WrapperProps {
  children: React.ReactNode;
}

const ThemeContext = createContext({
  theme: "light",
  setTheme: (theme: string) => {},
});

export function Wrapper({ children }: WrapperProps) {
  const [theme, setTheme] = useState("dark");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
