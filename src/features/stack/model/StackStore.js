import { create } from 'zustand';
import { fetchStackList, fetchStackDetail } from 'features/stack/api/StackApi';

const useStackStore = create((set) => ({
  stacks: [],
  stack: null,
  stackMeasurements: [],
  loading: false,

  setStacks: (list) => set({ stacks: list }),
  setStack: (data) => set({ stack: data }),
  setStackMeasurements: (list) => set({ stackMeasurements: list }),
  setLoading: (value) => set({ loading: value }),

  loadStacks: async () => {
    set({ loading: true });
    try {
      const res = await fetchStackList();
      set({ stacks: res.data});
    } catch (err) {
      console.error(err);
    } finally {
      set({ loading: false });
    }
  },

  loadStackDetail: async (stackId) => {
    set({ loading: true });
    try {
      const res = await fetchStackDetail(stackId);
      const { stack, stackMeasurements } = res.data;
      set({ stack, stackMeasurements });
    } catch (err) {
      console.error(err);
    } finally {
      set({ loading: false });
    }
  },

  reset: () => set({ stacks: [], stack: null, loading: false }),
}));

export default useStackStore;