import apiClient from "../AxiosConfiguration";
import handleApiError from "../ErrorHandlle";

export const getAllSentiment = async (params) => {
  try {
    const res = await apiClient.get(`/front/sentiments`, { params });
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};
