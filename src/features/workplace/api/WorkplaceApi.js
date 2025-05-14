import axios from 'axios';

const API_BASE = 'http://localhost:8080/api/management/workplaces';

export const fetchWorkplaceList = async () => {
  const response = await axios.get(`${API_BASE}`);
  return response.data;
}

export const createWorkplace = async (workplaceData) => {
  const response = await axios.post(`${API_BASE}`, workplaceData);
  return response.data;
}

export const fetchWorkplaceDetail = async (workplaceId) => {
  const response = await axios.get(`${API_BASE}/${workplaceId}`);
  return response.data;
}

export const fetchWorkplaceProfile = async (workplaceId) => {
  const response = await axios.get(`${API_BASE}/${workplaceId}/profile`);
  return response.data;
}

export const updateWorkplace = async (workplaceData) => {
  await axios.patch(`${API_BASE}/${workplaceData.workplaceId}`, workplaceData);
}

export const deleteWorkplace = async (workplaceId) => {
  const response = await axios.delete(`${API_BASE}/${workplaceId}`)
  return response.data;
}