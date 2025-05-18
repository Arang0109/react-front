import { create } from 'zustand';
import { fetchWorkplaceList, fetchWorkplaceDetail } from 'features/workplace/api/WorkplaceApi';

const useWorkplaceStore = create((set) => ({
  workplaces: [],
  workplace: null,
  stacks: [],
  loading: false,

  setWorkplaces: (list) => set({ workplaces: list }),
  setWorkplace: (data) => set({ workplace: data }),
  setStacks: (list) => set({ stacks: list }),
  setLoading: (value) => set({ loading: value }),

  loadWorkplaces: async () => {
    set({ loading: true });
    try {
      const list = await fetchWorkplaceList();
      set({ workplaces: list });
    } catch (err) {
      console.error(err);
    } finally {
      set({ loading: false });
    }
  },

  loadWorkplaceDetail: async (workplaceId) => {
    set({ loading: true });
    try {
      const res = await fetchWorkplaceDetail(workplaceId);
      const { workplace, stacks } = res.data;
      set({ workplace, stacks });
    } catch (err) {
      console.error(err);
    } finally {
      set({ loading: false });
    }
  },

  reset: () => set({ workplaces: [], workplace: null, loading: false }),
}));

export default useWorkplaceStore;