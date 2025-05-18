import { create } from 'zustand';
import { fetchTeamList } from 'features/organization/api/teamApi';

const useTeamStore = create((set) => ({
  teams: [],
  team: null,
  loading: false,

  setTeams: (list) => set({ teams: list }),
  setTeam: (data) => set({ team: data }),
  setLoading: (value) => set({ loading: value }),

  loadTeams: async () => {
    set({ loading: true });
    try {
      const list = await fetchTeamList();
      set({ teams: list });
    } catch (err) {
      console.log(err);
    } finally {
      set({ loading: false });
    }
  },

  reset: () => set({ teams: [], team: null, loading: false }),
}));

export default useTeamStore;