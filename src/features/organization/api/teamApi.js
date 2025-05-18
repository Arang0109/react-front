import axios from 'axios';

const API_BASE = 'http://localhost:8080/api/management/organization';

export const fetchTeamList = async () => {
  const response = await axios.get(`${API_BASE}/teams`);
  return response.data;
}

export const fetchStaffList = async () => {
  const response = await axios.get(`${API_BASE}/staffs`);
  return response.data;
}

export const fetchVehicleList = async () => {
  const response = await axios.get(`${API_BASE}/vehicles`);
  return response.data;
}