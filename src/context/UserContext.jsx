import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // User Mode: 'subscriber' | 'adhoc'
  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem('redwire_user_role') || 'subscriber';
  });

  // Language Mode: English only
  const [language, setLanguage] = useState('en');

  // Cart for Ad-hoc buyers
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('redwire_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Purchase History
  const [purchaseHistory, setPurchaseHistory] = useState(() => {
    const saved = localStorage.getItem('redwire_purchases');
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 'ORD-9821',
            date: '2025-08-01',
            mediaTitle: 'SpaceX Starship Orbital Test 8',
            licenseType: 'Per-Item Commercial License',
            amount: 120,
            status: 'Completed',
            downloadUrl: '#'
          }
        ];
  });

  // Notifications
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New Coverage Scheduled',
      titleAr: 'تغطية جديدة مجدولة',
      message: 'FIFA Club World Cup Final live stream starting at 20:00 GMT.',
      time: '10m ago',
      read: false
    },
    {
      id: 2,
      title: 'Download Ready',
      titleAr: 'التحميل جاهز',
      message: 'Your 4K package for Champions League Final is ready for export.',
      time: '1h ago',
      read: false
    }
  ]);

  useEffect(() => {
    localStorage.setItem('redwire_user_role', userRole);
  }, [userRole]);

  useEffect(() => {
    localStorage.setItem('redwire_lang', language);
    document.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  useEffect(() => {
    localStorage.setItem('redwire_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('redwire_purchases', JSON.stringify(purchaseHistory));
  }, [purchaseHistory]);

  const addToCart = (item) => {
    if (!cart.some((c) => c.id === item.id)) {
      setCart((prev) => [...prev, item]);
    }
  };

  const removeFromCart = (itemId) => {
    setCart((prev) => prev.filter((c) => c.id !== itemId));
  };

  const clearCart = () => setCart([]);

  const completeCheckout = (orderData) => {
    const newPurchases = cart.map((item) => ({
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      mediaTitle: item.title,
      licenseType: 'Standard Broadcast Rights',
      amount: item.price || 100,
      status: 'Completed',
      downloadUrl: '#'
    }));

    setPurchaseHistory((prev) => [...newPurchases, ...prev]);
    clearCart();
  };

  return (
    <UserContext.Provider
      value={{
        userRole,
        setUserRole,
        language,
        setLanguage,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        completeCheckout,
        purchaseHistory,
        notifications,
        isSubscriber: userRole === 'subscriber'
      }}
    >
      <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen">
        {children}
      </div>
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
