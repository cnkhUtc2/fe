export const getSentimentScore = async (url, data) => {
  try {
    const res = await axios.post(`${url}/predict`, data);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};
