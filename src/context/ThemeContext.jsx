import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Theme options: 'dark-red' | 'dark-emerald' | 'light'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('redwire_theme') || 'dark-red';
  });

  useEffect(() => {
    localStorage.setItem('redwire_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    if (theme === 'dark-red') setTheme('dark-emerald');
    else if (theme === 'dark-emerald') setTheme('light');
    else setTheme('dark-red');
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      <div className={`theme-${theme} min-h-screen transition-colors duration-300`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
