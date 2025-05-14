import { useState, useEffect } from 'react'

import { fetchPollutantList } from 'features/pollutant/api/PollutantApi'; 

import { PollutantTable } from 'features/pollutant';

export default function Pollutant() {
	const [pollutants, setPollutants] = useState([]);

	useEffect(() => {
		fetchPollutantList()
			.then(setPollutants)
	}, []);

	return(
		<div className="container-fluid mt-4">
			<div className="border p-4" style={{
				backgroundColor: 'var(--bg-color)',
				color: 'var(--text-color)'
			}}>
				<h4 className="fw-bold">측정항목 목록</h4>
				<div className="text-muted" style={{
						fontSize:"0.75rem"
					}}>총 항목 | 관리부서 : 실험실</div>
				<hr/>
				<PollutantTable pollutants={pollutants.data} />
			</div>
		</div>
	);
}