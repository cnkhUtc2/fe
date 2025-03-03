import apiClient from "../AxiosConfiguration";
import handleApiError from "../ErrorHandlle";

export const signin = async (user) => {
  try {
    const res = await apiClient.post(`/front/auth/login`, user);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};
