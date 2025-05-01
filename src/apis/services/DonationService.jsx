export const getFund = async () => {
  try {
    const res = await apiClient.get(`/admin/funds`);

    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};
