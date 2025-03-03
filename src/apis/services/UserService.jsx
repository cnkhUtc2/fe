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
