// src/features/company/model/companyStore.js
import { create } from 'zustand';
import { fetchCompanyList, fetchCompanyDetail  } from 'features/company/api/CompanyApi';

const useCompanyStore = create((set) => ({
  companies: [],
  company: null,
  workplaces: [],
  loading: false,

  setCompanies: (list) => set({ companies: list }),
  setCompany: (data) => set({ company: data }),
  setWorkplaces: (list) => set({ workplaces: list }),
  setLoading: (value) => set({ loading: value }),

  loadCompanies: async () => {
    set({ loading: true });
    try {
      const res = await fetchCompanyList();
      set({ companies: res.data });
    } catch (err) {
      console.error(err);
    } finally {
      set({ loading: false });
    }
  },

  loadCompanyDetail: async (companyId) => {
    set({ loading: true });
    try {
      const res = await fetchCompanyDetail(companyId);
      const { company, workplaces } = res.data;
      set({ company, workplaces });
    } catch (err) {
      console.error(err);
    } finally {
      set({ loading: false });
    }
  },

  reset: () => set({ companies: [], company: null, loading: false }),
}));

export default useCompanyStore;