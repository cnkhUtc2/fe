import apiClient from "../AxiosConfiguration";
import handleApiError from "../ErrorHandlle";

export const getAllDonationItems = async (params) => {
  try {
    const res = await apiClient.get(`/donation-items`, { params });
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const createDonationItem = async (data) => {
  try {
    const res = await apiClient.post(`/donation-items/create`, data);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getAdminDonationItems = async (params) => {
  try {
    const res = await apiClient.get(`/admin/donation-items`, { params });
    return res.data;
  } catch (error) {
    handleApiError(error);
    return { data: { items: [], meta: { total: 0 } } };
  }
};

export const updateDonationItem = async (id, data) => {
  try {
    const res = await apiClient.put(`/admin/donation-items/${id}`, data);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

