import axios from 'axios';

const API_BASE = 'http://localhost:8080/api/management/schedules';

export const fetchScheduledWorkplaceList = async () => {
  const response = await axios.get(`${API_BASE}/atmosphere`);
  return response.data;
}

export const fetchScheduledStackList = async (groupedWorkplaceId) => {
  const response = await axios.get(`${API_BASE}/atmosphere/${groupedWorkplaceId}`);
  return response.data;
};

export const fetchScheduleDetail = async (groupedScheduleId) => {
  const response = await axios.get(`${API_BASE}/${groupedScheduleId}`);
  return response.data;
}

export const createSchedule = async (scheduleData) => {
  const response = await axios.post(`${API_BASE}`, scheduleData);
  return response.data;
}