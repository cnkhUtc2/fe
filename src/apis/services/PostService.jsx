import apiClient from "../AxiosConfiguration";
import handleApiError from "../ErrorHandlle";

export const createUserPost = async (data) => {
  try {
    const config = {};
    if (data instanceof FormData) {
      config.headers = {
        "Content-Type": "multipart/form-data",
      };
    }

    const res = await apiClient.post(`/front/posts/blogs`, data, config);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const createAdminPost = async (data) => {
  try {
    const config = {};
    if (data instanceof FormData) {
      config.headers = {
        "Content-Type": "multipart/form-data",
      };
    }

    const res = await apiClient.post(`/admin/posts/blogs`, data, config);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getAllPosts = async (params) => {
  try {
    const res = await apiClient.get(`/admin/posts/blogs`, { params });
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getPost = async (id) => {
  try {
    const res = await apiClient.get(`/front/posts/${id}`);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updatePost = async (id, data) => {
  try {
    const res = await apiClient.put(`/admin/posts/blogs/${id}`, data);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const deletePosts = async (ids) => {
  try {
    const params = new URLSearchParams();
    ids.forEach((id) => params.append("ids", id));

    const res = await apiClient.delete(
      `/admin/posts/blogs?${params.toString()}`
    );
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};
