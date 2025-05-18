import { useEffect } from 'react';

import { WorkplaceListTable } from 'features/workplace';
import { useWorkplaceStore } from 'features/workplace/model';

export default function Workplace() {
	const { workplaces, loadWorkplaces } = useWorkplaceStore();

	useEffect(() => {
		loadWorkplaces();
	}, [loadWorkplaces]);

	return (
		<div className="container-fluid mt-4">
			<div className="border p-4" style={{
        backgroundColor: 'var(--bg-color)',
        color: 'var(--text-color)'
				}}>
				<h4 className="fw-bold">측정대상 사업장 목록</h4><span>총 {workplaces.length}개 사업장</span>
        <hr/>
				<WorkplaceListTable workplaces={workplaces}/>
			</div>
		</div>
	);
}
