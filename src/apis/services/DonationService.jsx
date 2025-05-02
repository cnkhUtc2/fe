import apiClient from "../AxiosConfiguration";
import handleApiError from "../ErrorHandlle";

export const getFund = async () => {
  try {
    const res = await apiClient.get(`/admin/funds`);

    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getAllTransactions = async () => {
  try {
    const res = await apiClient.get(`/front/payment-gateway/transactions`);

    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getTransactionById = async (id) => {
  try {
    const res = await apiClient.get(`/front/payment-gateway/transaction/${id}`);

    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};
