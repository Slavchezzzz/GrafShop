import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { orderService } from '../../api/orderService';
import './OrderHistory.css';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const data = await orderService.getOrderHistory();
            setOrders(data?.orders || []);
            setError(null);
        } catch (err) {
            setError('Ошибка при загрузке истории заказов');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const getStatusClass = (statusId) => {
        const statusClasses = {
            1: 'status-new',
            2: 'status-processing',
            3: 'status-shipped',
            4: 'status-delivered',
            5: 'status-cancelled'
        };
        return statusClasses[statusId] || 'status-default';
    };

    const getStatusText = (statusId) => {
        const statuses = {
            1: 'Новый',
            2: 'В обработке',
            3: 'Отправлен',
            4: 'Доставлен',
            5: 'Отменен'
        };
        return statuses[statusId] || 'Неизвестный статус';
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: 'RUB',
            minimumFractionDigits: 2
        }).format(price);
    };

    if (loading) {
        return <div className="order-history-loading">Загрузка истории заказов...</div>;
    }

    if (error) {
        return <div className="order-history-error">{error}</div>;
    }

    if (!orders || orders.length === 0) {
        return <div className="order-history-empty">У вас пока нет заказов</div>;
    }

    return (
        <div className="order-history">
            <h1>История заказов</h1>
            
            <div className="order-list">
                {orders.map((order) => (
                    <div key={order.id} className="order-card">
                        <div className="order-header">
                            <div className="order-number">
                                Заказ #{order.id}
                            </div>
                            <div className={`order-status ${getStatusClass(order.status_id)}`}>
                                {getStatusText(order.status_id)}
                            </div>
                        </div>
                        
                        <div className="order-info">
                            <div className="order-date">
                                {formatDate(order.order_date)}
                            </div>
                            <div className="order-total">
                                {formatPrice(order.total_amount)}
                            </div>
                        </div>
                        
                        <div className="order-details">
                            <div className="order-delivery">
                                <strong>Доставка:</strong> {order.delivery_method}
                            </div>
                            <div className="order-payment">
                                <strong>Оплата:</strong> {order.payment_method}
                            </div>
                        </div>
                        
                        <button 
                            className="view-order-button"
                            onClick={() => navigate(`/orders/${order.id}`)}
                        >
                            Подробнее
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderHistory; 