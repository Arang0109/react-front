import axios from 'axios';

const API_BASE = 'http://localhost:8080/api/management/companies';

export const fetchCompanyList = async () => {
  const response = await axios.get(`${API_BASE}`);
  return response.data;
};

export const createCompany = async (companyData) => {
	const response = await axios.post(`${API_BASE}`, companyData);
	return response.data;
};

export const fetchCompanyDetail = async (companyId) => {
  const response = await axios.get(`${API_BASE}/${companyId}`);
  return response.data;
};

export const updateCompany = async (companyData) => {
  await axios.patch(`${API_BASE}/${companyData.companyId}`, companyData);
};

export const deleteCompany = async (companyId) => {
  const response = await axios.delete(`${API_BASE}/${companyId}`)
  return response.data;
};