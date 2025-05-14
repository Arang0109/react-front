import { create } from 'zustand';
import { fetchScheduledStackList } from 'features/schedule/api/ScheduleApi';
import { fetchWorkplaceProfile } from 'features/workplace/api/WorkplaceApi';

const useScheduledStackStore = create((set) => ({
  scheduledStacks: [],
  scheduledStack: null,
  scheduledWorkplace: null,
  workplace: null,
  loading: false,

  setScheduledStacks: (list) => set({ scheduledStacks: list }),
  setScheduledStack: (data) => set({ scheduledStack: data }),
  setScheduledWorkplace: (data) => set({ scheduledWorkplace: data }),
  setWorkplace: (data) => set({ workplace: data }),
  setLoading: (value) => set({ loading: value }),

  loadScheduledStacks: async (groupedWorkplaceId) => {
    set({ loading: true });
    try {
      const response = await fetchScheduledStackList(groupedWorkplaceId);
      set({ scheduledStacks: response.data.scheduledStackTables });
      set({ scheduledWorkplace: response.data.scheduledWorkplace });
      const response2 = await fetchWorkplaceProfile(response.data.scheduledWorkplace.workplaceId);
      set({ workplace: response2.data });
    } catch (err) {
      console.error(err);
    } finally {
      set({ loading: false });
    }
  },

  reset: () => set({ scheduledStacks: [], scheduledStack: null, loading: false }),
}));

export default useScheduledStackStore;