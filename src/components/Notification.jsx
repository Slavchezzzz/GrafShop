import { useEffect } from 'react';
import '../styles/Notification.css';

export default function Notification({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="notification">
      <div className={`notification-content ${type}`}>
        <span className="notification-message">{message}</span>
      </div>
    </div>
  );
} 