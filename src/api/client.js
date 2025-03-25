import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080/", // Базовый URL вашего Yii API
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Перехватчик для обработки ошибок
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Перенаправление на страницу входа при 401
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default apiClient;
