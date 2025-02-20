const handleApiError = (error) => {
  if (error.response) {
    console.error("API Error Response:", error.response);
    throw new Error(error.response.data.message || "An error occurred");
  } else if (error.request) {
    console.error("No Response:", error.request);
    throw new Error("Network error. Please check your connection.");
  } else {
    console.error("Error:", error.message);
    throw new Error(error.message);
  }
};

export default handleApiError;
