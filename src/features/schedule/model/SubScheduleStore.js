import { create } from 'zustand';
import { fetchSubScheduleList } from 'features/schedule/api/ScheduleApi';

const useSubScheduleStore = create((set) => ({
  subSchedules: [],
  subSchedule: null,
  loading: false,

  setSubSchedules: (list) => set({ subSchedules: list }),
  setSubSchedule: (data) => set({ subSchedule: data }),
  setLoading: (value) => set({ loading: value }),

  loadSubSchedules: async (groupedScheduleIds) => {
    set({ loading: true });
    try {
      const list = await fetchSubScheduleList(groupedScheduleIds);
      set({ subSchedules: list });
    } catch (err) {
      console.error(err);
    } finally {
      set({ loading: false });
    }
  },

  reset: () => set({ subSchedules: [], subSchedule: null, loading: false }),
}));

export default useSubScheduleStore;