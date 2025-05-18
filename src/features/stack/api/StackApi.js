import axios from 'axios';

const API_BASE = 'http://localhost:8080/api/management/stacks';

export const fetchStackList = async () => {
  const response = await axios.get(`${API_BASE}`);
  return response.data;
}
export const createStack = async (stackData) => {
  const response = await axios.post(`${API_BASE}`, stackData);
  return response.data;
}

export const fetchStackDetail = async (stackId) => {
  const response = await axios.get(`${API_BASE}/${stackId}`);
  return response.data;
}

export const updateStack = async (stackData) => {
  const response = await axios.patch(`${API_BASE}/${stackData.stackId}`, stackData);
  return response.data;
}

export const deleteStack = async (stackId) => {
  await axios.delete(`${API_BASE}/${stackId}`);
}
