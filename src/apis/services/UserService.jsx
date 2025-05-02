import apiClient from "../AxiosConfiguration";
import handleApiError from "../ErrorHandlle";

export const getById = async (id) => {
  try {
    const res = await apiClient.get(`/front/users/get/${id}`);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const checkPassword = async (data) => {
  try {
    const res = await apiClient.post(`/front/auth/check-pass`, data);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateUserAccount = async (id, data) => {
  try {
    const res = await apiClient.put(`/front/users/update-account/${id}`, data);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getAllUsers = async (params) => {
  try {
    const res = await apiClient.get(`/admin/users`, { params });
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateStatus = async (ids, isBan) => {
  try {
    const params = new URLSearchParams();
    ids.forEach((id) => params.append("ids", id));

    if (isBan) {
      await apiClient.put(`/admin/users/ban?${params.toString()}`);
    }

    if (!isBan) {
      await apiClient.put(`/admin/users/un-ban?${params.toString()}`);
    }
  } catch (error) {
    handleApiError(error);
  }
};
