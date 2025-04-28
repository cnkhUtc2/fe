import apiClient from "../AxiosConfiguration";
import handleApiError from "../ErrorHandlle";

export const signin = async (data) => {
  try {
    const res = await apiClient.post(`/front/auth/login`, data);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const signup = async (data) => {
  try {
    const res = await apiClient.post(`/front/auth/login`, data);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};
