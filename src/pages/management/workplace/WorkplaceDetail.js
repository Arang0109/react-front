import { useEffect } from "react";
import { useParams } from 'react-router-dom';

import { useWorkplaceStore } from "features/workplace";

import { WorkplaceProfileForm } from "features/workplace";
import { StackListTable, StackRegisterModal } from "features/stack";

export default function WorkplaceDetail() {
	const stacks = useWorkplaceStore(state => state.stacks);
	const setStacks = useWorkplaceStore(state => state.setStacks);
  const workplace = useWorkplaceStore(state => state.workplace);
  const loading = useWorkplaceStore(state => state.loading);

	const { workplaceId } = useParams();

	const { loadWorkplaceDetail } = useWorkplaceStore.getState();

	useEffect(() => {
		const load = async () => {
			await loadWorkplaceDetail(workplaceId);
		};
		load();
	}, [workplaceId, loadWorkplaceDetail]);

	if (loading || !workplace) return <p>로딩 중...</p>;

	return(
		<div className="container-fluid">
			<div className="border rounded p-4 bg-body-tertiary">
				<h4 className="fw-bold">{workplace.workplaceName}</h4>
				<div className="text-muted" style={{
					fontSize:"0.75rem"
				}}>{workplace.address} | 등록일: {workplace.regDate}</div>
				<hr />
				<WorkplaceProfileForm
					workplace={workplace}
					workplaceId={workplaceId}/>
				<hr />
			</div>
			<div className="border rounded mt-4 p-4 bg-body-tertiary">
				<h5 className="fw-bold">배출구 시설 목록</h5>
				<div className="text-muted" style={{
						fontSize:"0.75rem"
					}}>총 {stacks.length}개 시설</div>
				<hr />
				<StackRegisterModal
					workplace={workplace}/>
				<StackListTable stacks={stacks} setStacks={setStacks} workplace={workplace} />
			</div>
			
		</div>
	);
}