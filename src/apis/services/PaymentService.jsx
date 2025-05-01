import apiClient from "../AxiosConfiguration";
import handleApiError from "../ErrorHandlle";

export const checkout = async (amount, currency) => {
  try {
    const res = await apiClient.get(
      `/front/payment-gateway/create-vnpay-url?amount=${amount}&currency=${currency}`
    );
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};
