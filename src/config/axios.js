import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Добавляем перехватчик для отладки запросов
api.interceptors.request.use(request => {
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
        return Promise.reject(error);
    }
);

export default api; 