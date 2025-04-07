import apiClient from "../AxiosConfiguration";
import handleApiError from "../ErrorHandlle";

export const checkout = async (data) => {
  try {
    const res = await apiClient.post(`/front/stripe/checkout`, data);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};
