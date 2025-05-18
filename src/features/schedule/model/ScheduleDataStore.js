import { create } from 'zustand';
import cloneDeep from 'lodash/cloneDeep';

export const initialMeasurementData = {
  // 기상 데이터
  weather: {
    weather: '',                  // 날씨
    atmosphericPressure: '',      // 대기압 (hPa)
    airTemperature: '',           // 온도 (℃)
    humidity: '',                 // 습도 (%)
    windDirection: '',            // 풍향
    windSpeed: '',                // 풍속 (m/s)
  },

  // 연소가스 / 배출가스 분석
  combustionGas: {
    oxygenConcentration: '',              // O₂ (%)
    carbonDioxideConcentration: '',       // CO₂ (%)
    carbonMonoxideConcentration: '',      // CO (%)
    referenceOxygenConcentration: '',     // 표준 산소농도 (%)
    noxConcentration: '',                 // NOx (mg/Sm³)
    soxConcentration: '',                 // SOx (mg/Sm³)
  },

  // 측정 시간
  time: {
    measurementStartTime: null,
    measurementEndTime: null,
  },

  // 수분량 관련 계측값
  moisture: {
    absorberWeightBefore: '',     // 측정 전 흡수병 무게 (g)
    absorberWeightAfter: '',      // 측정 후 흡수병 무게 (g)
    gasMeterTempIn: '',           // 가스미터 입구 온도 (℃)
    gasMeterTempOut: '',          // 가스미터 출구 온도 (℃)
    gasMeterReadingInitial: '',   // 가스미터 초기 적산량 (L)
    gasMeterReadingFinal: '',     // 가스미터 최종 적산량 (L)
  },
};

export const initialLabData = {
  analysisStartDate: null,
  analysisEndDate: null,
};

const useScheduleDataStore = create((set, get) => ({
  /** LOCAL_KEY별 데이터 */
  measurementDataMap: {},
  labDataMap: {},

  setField: (localKey, section, key, value) =>
    set((state) => {
      const base = state.measurementDataMap[localKey] ?? cloneDeep(initialMeasurementData);
      return {
        measurementDataMap: {
          ...state.measurementDataMap,
          [localKey]: {
            ...base,
            [section]: {
              ...base[section],
              [key]: value,
            },
          },
        },
      };
    }),

  getMeasurementData: (localKey) =>
    get().measurementDataMap[localKey] ?? cloneDeep(initialMeasurementData),

  setMeasurementData: (localKey, data) =>
    set((state) => ({
      measurementDataMap: {
        ...state.measurementDataMap,
        [localKey]: cloneDeep(data),
      },
    })),

  getLabData: (localKey) =>
    get().labDataMap[localKey] ?? cloneDeep(initialLabData),

  setLabData: (localKey, data) =>
    set((state) => ({
      labDataMap: {
        ...state.labDataMap,
        [localKey]: cloneDeep(data),
      },
    })),

  resetMeasurementData: (localKey) =>
    set((state) => ({
      measurementDataMap: {
        ...state.measurementDataMap,
        [localKey]: cloneDeep(initialMeasurementData),
      },
    })),

  resetLabData: (localKey) =>
    set((state) => ({
      labDataMap: {
        ...state.labDataMap,
        [localKey]: cloneDeep(initialLabData),
      },
    })),
}));

export default useScheduleDataStore;