import { useState, useEffect, useContext } from 'react';
import './App.css';
import { Routes, Route, Link, useParams } from "react-router-dom";

import ThemeContext from './contexts/ThemeContext';
import ThemeToggle from './components/ToggleThemeButton';
import GetPokemonList from './components/GetPokemonList';

function App() {
  // const [theme, setTheme] = useState("dark"); // Default theme is 'dark'

  // persist across page reloads - store the theme in localStorage and retrieve it on app initialization:
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light'); // Default to 'dark'

  const contextValue = {
    theme,
    setTheme
  };

  useEffect(() => {
    // Apply the theme class when the component mounts
    document.body.classList.toggle("dark-theme", theme === "dark");
  }, [theme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <>
        <ThemeToggle />
        <GetPokemonList />
      </>
    </ThemeContext.Provider>
  );
};

export default App;
