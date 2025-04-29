import apiClient from "../AxiosConfiguration";
import handleApiError from "../ErrorHandlle";

export const createSupportTicket = async (data) => {
  try {
    const config = {};
    if (data instanceof FormData) {
      config.headers = {
        "Content-Type": "multipart/form-data",
      };
    }

    const res = await apiClient.post(`/front/tickets/create`, data, config);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getAllTickets = async (params) => {
  try {
    const res = await apiClient.get(`/admin/tickets`, { params });
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getTicketById = async (id) => {
  try {
    const res = await apiClient.get(`/admin/tickets/${id}`);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateTicketStatus = async (id, data) => {
  try {
    const res = await apiClient.put(`/admin/tickets/update/${id}`, data);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};
