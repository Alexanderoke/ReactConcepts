import { useTheme } from "../context/useTheme.js";

export default function Header({title}) {
  const {theme, toggleTheme} = useTheme();
  return (
    <header className="header">
      <h1>{title}</h1>
      <button onClick={toggleTheme}>
        {theme === "light" ? "Dark mode" : "Light mode"}
      </button>
    </header>
  );
}