import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useStackStore } from "features/stack";

import { StackProfileForm, StackMeasurementsList, StackMeasurementRegisterModal } from "features/stack";

export default function StackDetail() {
	const [selectedMeasurements, setSelectedMeasurements] = useState([]);

	const stackMeasurements = useStackStore(state => state.stackMeasurements);
  const stack = useStackStore(state => state.stack);
  const loading = useStackStore(state => state.loading);

	const { stackId } = useParams();

	const { loadStackDetail } = useStackStore.getState();

	useEffect(() => {
		const load = async () => {
			await loadStackDetail(stackId);
		};
		load();
	}, [stackId, loadStackDetail]);

	if (loading || !stack) return <p>로딩 중...</p>

	return(
		<div className="container-fluid">
			<div className="border rounded p-4 bg-body-tertiary">
				<h4 className="fw-bold">{stack.stackName}</h4>
				<div className="text-muted" style={{
						fontSize:"0.75rem"
					}}>등록일: {stack.regDate}</div>
				<hr/>
				<StackProfileForm 
					stack={stack}
					stackId={stackId}/>
			</div>
			<div className="border rounded p-4 mt-4 bg-body-tertiary">
			<div className="mb-4">
					<StackMeasurementRegisterModal
						selectedMeasurements={selectedMeasurements}
						stackMeasurements={stackMeasurements}
						stackId={stackId}/>
				</div>
					<StackMeasurementsList
						stackMeasurements={stackMeasurements}
						setSelectedMeasurements={setSelectedMeasurements}/>
			</div>
		</div>
	);
}