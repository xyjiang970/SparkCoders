import React from "react";

const ThemeContext = React.createContext({
    theme: 'light',
    setTheme: () => null // empty function
});


export default ThemeContext;