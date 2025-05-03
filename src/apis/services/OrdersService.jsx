import apiClient from "../AxiosConfiguration";
import handleApiError from "../ErrorHandlle";

export const getAllOrders = async (params) => {
  try {
    const res = await apiClient.get(`/front/orders`, { params });
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const createOrder = async (data) => {
  try {
    const res = await apiClient.post(`/front/orders/create`, data);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Add admin order functions
export const getAdminOrders = async (params) => {
  try {
    const res = await apiClient.get(`/admin/orders`, { params });
    return res.data;
  } catch (error) {
    handleApiError(error);
    return { data: { items: [], meta: { total: 0 } } };
  }
};

export const updateOrder = async (path, data) => {
  try {
    const res = await apiClient.put(`/front/orders/${path}`, data);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const deleteOrder = async (id) => {
  try {
    const res = await apiClient.delete(`/admin/orders/${id}`);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};
