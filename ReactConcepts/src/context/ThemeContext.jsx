import { useState } from "react";
import { ThemeContext } from "./theme-context.js";

export function ThemeProvider({children}) {
  const [theme, setTheme] = useState("light");

  function toggleTheme() {
    setTheme((current)=>(current === "light" ? "dark" : "light"));
  }

  return(
    <ThemeContext.Provider value ={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );  
}