import { useEffect } from 'react';

import { useStackStore } from 'features/stack'

import { StackListTable } from 'features/stack/ui';

export default function Stack() {
	const { stacks, loadStacks } = useStackStore();

	useEffect(() => {
		loadStacks();
	}, [loadStacks]);

	return (
		<div className="container-fluid mt-4">
			<div className="border p-4" style={{
        backgroundColor: 'var(--bg-color)',
        color: 'var(--text-color)'
				}}>
				<h4 className="fw-bold">배출 시설 목록</h4><span>총 {stacks.length}개 시설</span>
        <hr/>
				<StackListTable stacks={stacks}/>
			</div>
		</div>
	);
}
