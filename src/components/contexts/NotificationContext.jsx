import React, { createContext, useContext, useState } from 'react';
import Notification from '../Notification';

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notification, setNotification] = useState(null);
  const [type, setType] = useState('success');

  const showNotification = (message, notificationType = 'success') => {
    setNotification(message);
    setType(notificationType);
  };

  const hideNotification = () => {
    setNotification(null);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification && (
        <Notification 
          message={notification} 
          type={type}
          onClose={hideNotification} 
        />
      )}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
} 