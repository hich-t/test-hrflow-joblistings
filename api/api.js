import axios from "axios";

const BASE_URL = "https://659824d4668d248edf2430a8.mockapi.io/api";

export const getJobs = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/jobs`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
