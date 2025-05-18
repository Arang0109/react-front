import axios from 'axios';

const API_BASE = 'http://localhost:8080/api/management/stack-measurements';

export const createStackMeasurement = async (stackMeasurementData) => {
  await axios.post(`${API_BASE}`, stackMeasurementData);
}

export const deleteStackMeasurements = async (stackMeasurementData) => {
  await axios.delete(`${API_BASE}`, {
    data: stackMeasurementData
  });
}