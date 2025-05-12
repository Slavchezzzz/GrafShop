import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MainCard from '../components/MainCard';
import { useCart } from '../components/data/CartContext';
import { ProductsContext } from '../components/contexts/ProductsContext';
import '../styles/ProfilePage.css';

export default function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');
  const [orders, setOrders] = useState([]);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { favorites } = useCart();
  const { products } = useContext(ProductsContext);

  // Фильтруем избранные товары
  const favoriteProducts = products.filter(product => favorites.includes(product.id));

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(userData));
    // TODO: Загрузка истории заказов с сервера
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('cart');
    localStorage.removeItem('favorites');
    navigate('/');
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    handleLogout();
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="profile-page">
      <Header />
      <div className="profile-container">
        <div className="profile-sidebar">
          <div className="profile-avatar">
            <div className="avatar-placeholder">
              {user.login.charAt(0).toUpperCase()}
            </div>
            <h2>{user.login}</h2>
          </div>
          <nav className="profile-nav">
            <button 
              className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              Профиль
            </button>
            <button 
              className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              История заказов
            </button>
            <button 
              className={`nav-item ${activeTab === 'favorites' ? 'active' : ''}`}
              onClick={() => setActiveTab('favorites')}
            >
              Избранное
            </button>
            <button 
              className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              Настройки
            </button>
          </nav>
        </div>

        <div className="profile-content">
          {activeTab === 'profile' && (
            <div className="profile-info">
              <h3>Личная информация</h3>
              <div className="info-group">
                <label>Логин:</label>
                <span>{user.login}</span>
              </div>
              <div className="info-group">
                <label>Email:</label>
                <span>{user.email}</span>
              </div>
              <div className="info-group">
                <label>Дата регистрации:</label>
                <span>{new Date(user.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="orders-history">
              <h3>История заказов</h3>
              {orders.length > 0 ? (
                <div className="orders-list">
                  {orders.map(order => (
                    <div key={order.id} className="order-card">
                      <div className="order-header">
                        <span className="order-number">Заказ #{order.id}</span>
                        <span className="order-date">{new Date(order.date).toLocaleDateString()}</span>
                        <span className={`order-status ${order.status}`}>{order.status}</span>
                      </div>
                      <div className="order-items">
                        {order.items.map(item => (
                          <div key={item.id} className="order-item">
                            <img src={item.image} alt={item.name} />
                            <div className="item-details">
                              <h4>{item.name}</h4>
                              <p>Количество: {item.quantity}</p>
                              <p>Цена: {item.price} ₽</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="order-total">
                        <span>Итого: {order.total} ₽</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-orders">У вас пока нет заказов</p>
              )}
            </div>
          )}

          {activeTab === 'favorites' && (
            <div className="favorites">
              <h3>Избранные товары</h3>
              {favoriteProducts.length > 0 ? (
                <MainCard products={favoriteProducts} />
              ) : (
                <div className="no-favorites">
                  <p>У вас пока нет избранных товаров</p>
                  <button 
                    className="browse-products-button"
                    onClick={() => navigate('/test')}
                  >
                    Перейти в каталог
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="settings">
              <h3>Настройки аккаунта</h3>
              <div className="settings-group">
                <h4>Изменение пароля</h4>
                <form className="password-form">
                  <div className="form-group">
                    <label>Текущий пароль</label>
                    <input type="password" />
                  </div>
                  <div className="form-group">
                    <label>Новый пароль</label>
                    <input type="password" />
                  </div>
                  <div className="form-group">
                    <label>Подтвердите новый пароль</label>
                    <input type="password" />
                  </div>
                  <button type="submit" className="save-button">Сохранить изменения</button>
                </form>
              </div>
              <div className="settings-group">
                <h4>Управление аккаунтом</h4>
                <button onClick={handleLogoutClick} className="logout-button">
                  Выйти из аккаунта
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />

      {/* Модальное окно подтверждения выхода */}
      {showLogoutModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Подтверждение выхода</h3>
            <p>Вы уверены, что хотите выйти из аккаунта?</p>
            <div className="modal-buttons">
              <button onClick={handleLogoutConfirm} className="confirm-button">
                Да, выйти
              </button>
              <button onClick={handleLogoutCancel} className="cancel-button">
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 