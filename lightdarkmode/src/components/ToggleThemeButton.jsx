import { useContext } from "react";
import ThemeContext from "../contexts/ThemeContext";

const ThemeToggle = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  // const toggleTheme = () => {
  //   const newTheme = theme === "light" ? "dark" : "light";
  //   setTheme(newTheme);
  //   document.body.classList.toggle("dark-theme", newTheme === "dark");
  // };

  //  save the new theme to localStorage:
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.classList.toggle("dark-theme", newTheme === "dark");
    localStorage.setItem('theme', newTheme); // Save the theme to localStorage
  };

  return <button onClick={toggleTheme}>Change Theme</button>;
};

export default ThemeToggle;
