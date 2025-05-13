import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export const orderService = {
    getOrderHistory: async () => {
        try {
            const response = await axios.get(`${API_URL}/order/history`, {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching order history:', error);
            throw error;
        }
    },

    getOrderDetails: async (orderId) => {
        try {
            const response = await axios.get(`${API_URL}/order/view?id=${orderId}`, {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching order details:', error);
            throw error;
        }
    }
}; 