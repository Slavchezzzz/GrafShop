import client from './client';

const adminService = {
    // Get all users
    getAllUsers: () => {
        return client.get('/api/admin/users');
    },

    // Get user by ID
    getUserById: (userId) => {
        return client.get(`/api/admin/users/${userId}`);
    },

    // Update user
    updateUser: (userId, userData) => {
        return client.put(`/api/admin/users/${userId}`, userData);
    },

    // Delete user
    deleteUser: (userId) => {
        return client.delete(`/api/admin/users/${userId}`);
    },

    // Get all orders
    getAllOrders: () => {
        return client.get('/api/admin/orders');
    },

    // Update order status
    updateOrderStatus: (orderId, status) => {
        return client.put(`/api/admin/orders/${orderId}/status`, { status });
    },

    // Get dashboard statistics
    getDashboardStats: () => {
        return client.get('/api/admin/dashboard/stats');
    }
};

export default adminService; 