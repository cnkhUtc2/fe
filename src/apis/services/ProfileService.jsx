import apiClient from "../AxiosConfiguration";
import handleApiError from "../ErrorHandlle";

export const getProfile = async (id) => {
  try {
    const res = await apiClient.get(`/front/users/get/profile/${id}`);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateUserProfile = async (id, data) => {
  try {
    const config = {};
    if (data instanceof FormData) {
      config.headers = {
        "Content-Type": "multipart/form-data",
      };
    }

    const res = await apiClient.put(
      `/front/users/update-profile/${id}`,
      data,
      config
    );
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};
