import apiClient from "./client";

export default {
  // Получение списка брендов
  async getBrands() {
    try {
      const response = await apiClient.get("/brands/data");
      return {
        success: true,
        data: response.data.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Ошибка загрузки брендов",
      };
    }
  },

  // Получение одного бренда (если нужно)
  async getBrandById(id) {
    try {
      const response = await apiClient.get(`/brands/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
