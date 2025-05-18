import { useEffect } from "react";
import { useParams } from 'react-router-dom';

import { useCompanyStore } from "features/company";

import { CompanyProfileForm } from "features/company";
import { WorkplaceListTable, WorkplaceRegisterModal } from "features/workplace";

export default function CompanyDetail() {
  const workplaces = useCompanyStore(state => state.workplaces);
	const setWorkplaces = useCompanyStore(state => state.setWorkplaces);
  const company = useCompanyStore(state => state.company);
  const loading = useCompanyStore(state => state.loading);

	const { companyId } = useParams();

	const { loadCompanyDetail } = useCompanyStore.getState();
	
	useEffect(() => {
    const load = async () => {
      await loadCompanyDetail(companyId);
    };
    load();
  }, [companyId, loadCompanyDetail]);

	if (loading || !company) return <p>로딩 중...</p>;

	return(
		<div className="container-fluid">
			<div className="border rounded p-4 bg-body-tertiary">
				<h4 className="fw-bold">{company.companyName}</h4>
				<div className="text-muted" style={{
					fontSize:"0.75rem"
				}}>{company.address} | 등록일: {company.regDate}</div>
				<hr />
				<CompanyProfileForm
					company={company}
					companyId={companyId}/>
			</div>
			<div className="border rounded mt-4 p-4 bg-body-tertiary">
				<h5 className="fw-bold">측정대상 사업장 목록</h5>
				<div className="text-muted" style={{
						fontSize:"0.75rem"
					}}>총 {workplaces.length}개 사업장</div>
				<hr />
				<WorkplaceRegisterModal
					company={company}/>
				<WorkplaceListTable workplaces={workplaces} setWorkplaces={setWorkplaces} company={company} />
			</div>
		</div>
	);
}