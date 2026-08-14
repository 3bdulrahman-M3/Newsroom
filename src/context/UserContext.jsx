import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // User Authentication State
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('redwire_user');
    return saved ? JSON.parse(saved) : { name: 'Sarah Jenkins', email: 's.jenkins@newsroom.com', avatar: 'SJ' };
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('redwire_logged_in') === 'true' || true;
  });

  // Language Mode: English only
  const [language, setLanguage] = useState('en');

  // Notifications
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New Coverage Scheduled',
      message: 'FIFA Club World Cup Final live stream starting at 20:00 GMT.',
      time: '10m ago',
      read: false
    },
    {
      id: 2,
      title: 'Download Ready',
      message: 'Your 4K package for Champions League Final is ready for export.',
      time: '1h ago',
      read: false
    }
  ]);

  useEffect(() => {
    localStorage.setItem('redwire_logged_in', isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('redwire_user', JSON.stringify(user));
    }
  }, [user]);

  const loginUser = (email) => {
    const nameFromEmail = email.split('@')[0].replace('.', ' ');
    const initials = nameFromEmail.split(' ').map(n => n[0]).join('').toUpperCase();
    const newUser = {
      name: nameFromEmail || 'Media User',
      email: email,
      avatar: initials || 'MU'
    };
    setUser(newUser);
    setIsLoggedIn(true);
  };

  const logoutUser = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isLoggedIn,
        loginUser,
        logoutUser,
        language,
        notifications
      }}
    >
      <div className="min-h-screen">
        {children}
      </div>
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
