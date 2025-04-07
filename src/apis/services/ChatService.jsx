import apiClient from "../AxiosConfiguration";
import handleApiError from "../ErrorHandlle";

export const getConversations = async (userId) => {
  try {
    const res = await apiClient.get(`/front/conversations/${userId}`);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const createMessage = async (message) => {
  try {
    const res = await apiClient.post(`/front/messages/create`, message);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getMessages = async (currentChatId) => {
  try {
    const res = await apiClient.get(`/front/messages/${currentChatId}`);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};
