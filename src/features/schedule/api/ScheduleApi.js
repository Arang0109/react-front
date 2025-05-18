import axios from 'axios';
import qs from 'qs';

const API_BASE = 'http://localhost:8080/api/management/schedules';

export const fetchScheduleList = async () => {
  const response = await axios.get(`${API_BASE}`);
  return response.data;
}

export const fetchSubScheduleList = async (groupedScheduleIds) => {
  const response = await axios.get(`${API_BASE}/subSchedules`, {
    params: { ids: groupedScheduleIds },
    paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' }) // 핵심 부분
  });
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