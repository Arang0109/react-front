import axios from 'axios';

const API_BASE = 'http://localhost:8080/api/management/pollutants';

export const fetchPollutantList = async () => {
  const response = await axios.get(`${API_BASE}`);
  return response.data;
}