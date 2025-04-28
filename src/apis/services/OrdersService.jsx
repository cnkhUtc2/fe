import apiClient from "../AxiosConfiguration";
import handleApiError from "../ErrorHandlle";

export const getAllOrders = async (params) => {
  try {
    const res = await apiClient.get(`/orders`, { params });
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const createOrder = async (data) => {
  try {
    const res = await apiClient.post(`/orders/create`, data);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};
