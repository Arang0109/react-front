import { createWorkplace } from "features/workplace/api/WorkplaceApi";
import { useCompanyStore } from "features/company";

export async function updateWorkplaceListOnRegister(data, companyId) {
  const { loadCompanyDetail } = useCompanyStore.getState();
  await createWorkplace(data);
  await loadCompanyDetail(companyId);
}