import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Добавляем перехватчик для добавления токена к каждому запросу
api.interceptors.request.use(request => {
    const token = localStorage.getItem('token');
    if (token) {
        request.headers['Authorization'] = `Bearer ${token}`;
    }
    console.log('Отправляемый запрос:', {
        url: request.url,
        method: request.method,
        headers: request.headers,
        data: request.data
    });
    return request;
});

// Добавляем перехватчик для отладки ответов
api.interceptors.response.use(
    response => {
        console.log('Получен ответ:', response.data);
        return response;
    },
    error => {
        console.error('Ошибка запроса:', error.response?.data || error);
        // Если токен истек или недействителен, очищаем localStorage и перенаправляем на страницу входа
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api; 