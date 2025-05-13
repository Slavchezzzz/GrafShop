import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { orderService } from '../../api/orderService';
import './OrderDetails.css';

const OrderDetails = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchOrderDetails();
    }, [orderId]);

    const fetchOrderDetails = async () => {
        try {
            setLoading(true);
            const data = await orderService.getOrderDetails(orderId);
            setOrder(data);
            setError(null);
        } catch (err) {
            setError('Ошибка при загрузке деталей заказа');
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
        return <div className="order-details-loading">Загрузка деталей заказа...</div>;
    }

    if (error) {
        return <div className="order-details-error">{error}</div>;
    }

    if (!order) {
        return <div className="order-details-not-found">Заказ не найден</div>;
    }

    return (
        <div className="order-details">
            <div className="order-details-header">
                <h1>Заказ #{order.id}</h1>
                <div className={`order-status ${getStatusClass(order.status_id)}`}>
                    {getStatusText(order.status_id)}
                </div>
            </div>

            <div className="order-details-grid">
                <div className="order-info-section">
                    <h2>Информация о заказе</h2>
                    <div className="info-card">
                        <div className="info-row">
                            <span>Дата заказа:</span>
                            <span>{formatDate(order.order_date)}</span>
                        </div>
                        <div className="info-row">
                            <span>Способ доставки:</span>
                            <span>{order.delivery_method}</span>
                        </div>
                        <div className="info-row">
                            <span>Способ оплаты:</span>
                            <span>{order.payment_method}</span>
                        </div>
                        <div className="info-row">
                            <span>Тип оплаты:</span>
                            <span>{order.payment_type}</span>
                        </div>
                    </div>
                </div>

                <div className="customer-info-section">
                    <h2>Информация о покупателе</h2>
                    <div className="info-card">
                        <div className="info-row">
                            <span>Имя:</span>
                            <span>{order.customer_name}</span>
                        </div>
                        <div className="info-row">
                            <span>Телефон:</span>
                            <span>{order.phone}</span>
                        </div>
                        <div className="info-row">
                            <span>Email:</span>
                            <span>{order.email}</span>
                        </div>
                        <div className="info-row">
                            <span>Адрес:</span>
                            <span>{order.address}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="order-items-section">
                <h2>Товары в заказе</h2>
                <div className="order-items">
                    {order.items.map((item) => (
                        <div key={item.id} className="order-item">
                            <div className="item-name">{item.product_name}</div>
                            <div className="item-quantity">{item.quantity} шт.</div>
                            <div className="item-price">{formatPrice(item.unit_price)}</div>
                            <div className="item-total">{formatPrice(item.subtotal)}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="order-summary">
                <div className="summary-row">
                    <span>Подытог:</span>
                    <span>{formatPrice(order.subtotal)}</span>
                </div>
                <div className="summary-row">
                    <span>Доставка:</span>
                    <span>{formatPrice(order.delivery_price)}</span>
                </div>
                <div className="summary-row total">
                    <span>Итого:</span>
                    <span>{formatPrice(order.total_amount)}</span>
                </div>
            </div>

            <div className="order-actions">
                <button 
                    className="back-button"
                    onClick={() => navigate('/orders')}
                >
                    Вернуться к истории заказов
                </button>
            </div>
        </div>
    );
};

export default OrderDetails; 