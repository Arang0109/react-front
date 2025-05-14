import { create } from 'zustand';
import { fetchScheduledWorkplaceList } from 'features/schedule/api/ScheduleApi';

const useScheduledWorkplaceStore = create((set) => ({
  scheduledWorkplaces: [],
  scheduledWorkplace: null,
  loading: false,

  setScheduledWorkplaces: (list) => set({ scheduledWorkplaces: list }),
  setScheduledWorkplace: (data) => set({ scheduledWorkplace: data }),
  setLoading: (value) => set({ loading: value }),

  loadScheduledWorkplaces: async () => {
    set({ loading: true });
    try {
      const response = await fetchScheduledWorkplaceList();
      set({ scheduledWorkplaces: response.data });
    } catch (err) {
      console.error(err);
    } finally {
      set({ loading: false });
    }
  },

  reset: () => set({ scheduledWorkplaces: [], scheduledWorkplace: null, loading: false }),
}));

export default useScheduledWorkplaceStore;