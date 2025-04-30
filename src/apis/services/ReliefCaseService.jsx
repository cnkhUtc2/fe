import apiClient from "../AxiosConfiguration";
import handleApiError from "../ErrorHandlle";

export const createReliefCase = async (data) => {
  try {
    const res = await apiClient.post(`/admin/relief-cases/create`, data);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateReliefCase = async (id, data) => {
  try {
    const res = await apiClient.put(`/admin/relief-cases/update/${id}`, data);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getAllReliefCases = async (params) => {
  try {
    const res = await apiClient.get(`/admin/relief-cases`, { params });
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getReliefCase = async (id) => {
  try {
    const res = await apiClient.get(`/admin/relief-cases/${id}`);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const deleteReliefCases = async (ids) => {
  try {
    const params = new URLSearchParams();
    ids.forEach((id) => params.append("ids", id));

    const res = await apiClient.delete(
      `/admin/relief-cases?${params.toString()}`
    );
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};
