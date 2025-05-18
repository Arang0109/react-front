export const formatters = {
  bizNumber: {
    format: (value) => {
      const onlyNums = value.replace(/\D/g, '');
      if (onlyNums.length < 4) return onlyNums;
      if (onlyNums.length < 6) return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
      return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 5)}-${onlyNums.slice(5, 10)}`;
    },
    unformat: (value) => value.replace(/\D/g, '')
  },

  regNumber: {
    format: (value) => `KGAR-25-01-${value.toString().padStart(3, "0") ?? "000"}`,
    unformat: (value) => value.replace(/[^\d.-]/g, '')
  },

  height: {
    format: (value) => `${parseFloat(value).toFixed(3)} m`,
    unformat: (value) => value.replace(/[^\d.-]/g, '')
  },

  pressure: {
    format: (value) => `${parseFloat(value).toFixed(1)} mmHg`,
    unformat: (value) => value.replace(/[^\d.-]/g, '')
  },

  pressureHpa: {
    format: (value) => `${parseFloat(value).toFixed(1)} Hpa`,
    unformat: (value) => value.replace(/[^\d.-]/g, '')
  },

  quantity: {
    format: (value) => {
      if (value === null || value === undefined || value === '') return '-';
      const num = parseFloat(value);
      if (isNaN(num)) return value;
  
      return `${num.toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 })} m³/h`;
    },
    unformat: (value) => value.replace(/[^\d.-]/g, '')
  },

  temperature: {
    format: (value) => `${parseFloat(value).toFixed(0)} ℃`,
    unformat: (value) => value.replace(/[^\d.-]/g, '')
  },

  airTemperature: {
    format: (value) => `${parseFloat(value).toFixed(1)} ℃`,
    unformat: (value) => value.replace(/[^\d.-]/g, '')
  },

  humidity: {
    format: (value) => `${parseFloat(value).toFixed(1)} %`,
    unformat: (value) => value.replace(/[^\d.-]/g, '')
  },

  windSpeed: {
    format: (value) => `${parseFloat(value).toFixed(1)} m/s`,
    unformat: (value) => value.replace(/[^\d.-]/g, '')
  },

  facilitySize: {
    format: (value) => `${value} 종`,
    unformat: (value) => value
  }
};