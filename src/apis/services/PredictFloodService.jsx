import axios from "axios";
import apiClient from "../AxiosConfiguration";
import handleApiError from "../ErrorHandlle";

export const getCurrentLocation = async (latitude, longitude) => {
  try {
    const res = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
    );
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getCurrentCoor = async (place) => {
  try {
    const res = await axios.get(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        place
      )}`
    );
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getCurrentWeather = async (latitude, longitude, key) => {
  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`
    );
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getPredict = async (url, data) => {
  try {
    const res = await axios.post(`${url}/predict`, data);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};
