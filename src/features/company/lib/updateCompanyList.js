// src/features/company/lib/updateCompanyList.js
import { createCompany } from 'features/company/api/CompanyApi';
import { useCompanyStore } from 'features/company';

export async function updateCompanyListOnRegister(data) {
  const { loadCompanies } = useCompanyStore.getState(); // 상태 외부에서 접근
  await createCompany(data);
  await loadCompanies(); // 상태 업데이트
}
