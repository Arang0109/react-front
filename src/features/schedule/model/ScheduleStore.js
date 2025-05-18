import { create } from 'zustand';
import { fetchScheduleList } from 'features/schedule/api/ScheduleApi';

const useScheduleStore = create((set) => ({
  schedules: [],
  schedule: null,
  loading: false,

  setSchedules: (list) => set({ schedules: list }),
  setSchedule: (data) => set({ schedule: data }),
  setLoading: (value) => set({ loading: value }),

  loadSchedules: async () => {
    set({ loading: true });
    try {
      const list = await fetchScheduleList();
      set({ schedules: list });
    } catch (err) {
      console.error(err);
    } finally {
      set({ loading: false });
    }
  },

  reset: () => set({ schedules: [], schedule: null, loading: false }),
}));

export default useScheduleStore;