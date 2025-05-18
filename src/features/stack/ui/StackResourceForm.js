import { Form, Row, Col } from 'react-bootstrap';

import { formatters } from 'shared/utils/formatters';

export default function StackResourceForm({ stackResource, setStackForm, readOnly }) {
	const handleChange = (e) => {
		const { name, value } = e.target;
		
		setStackForm((prev) => ({
			...prev,
			stackInformation: {
				...prev.stackInformation,
				[name]: value,
			},
		}));
	};

	return (
		<Form>
			<Row className="mb-3">
				<Col md={3}>
					<Form.Group controlId="stackDirection">
						<Form.Label>
							배출시설 방향
						</Form.Label>
						<Form.Select
							name="stackDirection"
							value={stackResource.stackDirection ?? ''}
							disabled={readOnly}
							onChange={handleChange}
							aria-label="배출시설 방향"
						>
							<option value="">선택하세요</option>
							<option value="수직">수직</option>
							<option value="수평">수평</option>
						</Form.Select>
					</Form.Group>
				</Col>

				<Col md={3}>
					<Form.Group controlId="stackShape">
						<Form.Label>배출구 모양</Form.Label>
						<Form.Select
							name="stackShape"
							value={stackResource.stackShape ?? ''}
							disabled={readOnly}
							onChange={handleChange}
							aria-label="배출구 모양"
						>
							<option value="">선택하세요</option>
							<option value="원형">원형</option>
							<option value="사각형">사각형</option>
							<option value="해당없음">해당없음</option>
						</Form.Select>
					</Form.Group>
				</Col>

				<Col md={3}>
					<Form.Group controlId="diameter">
						<Form.Label>
							{stackResource.stackShape === '사각형' ? '가로' : '직경'}
						</Form.Label>
						<Form.Control
							type="text"
							value={readOnly
								? formatters.height.format(stackResource.diameter)
								: stackResource.diameter ?? ''}
							name="diameter"
							readOnly={readOnly}
							onChange={handleChange}
						/>
					</Form.Group>
				</Col>

				{stackResource.stackShape === '사각형' && (
					<Col md={3}>
						<Form.Group controlId="diameter2">
							<Form.Label>세로</Form.Label>
							<Form.Control
								type="text"
								value={readOnly
									? formatters.height.format(stackResource.diameter2)
									: stackResource.diameter2 ?? ''}
								name="diameter2"
								readOnly={readOnly}
								onChange={handleChange}
							/>
						</Form.Group>
					</Col>
				)}
			</Row>

			<Row className="mb-3">
				<Col md={3}>
					<Form.Group controlId="height">
						<Form.Label>배출구 높이</Form.Label>
						<Form.Control
							type="text"
							value={readOnly
								? formatters.height.format(stackResource.height)
								: stackResource.height ?? ''}
							name="height"
							readOnly={readOnly}
							onChange={handleChange}
						/>
					</Form.Group>
				</Col>

				<Col md={3}>
					<Form.Group controlId="quantity">
						<Form.Label>
							설계 유량
						</Form.Label>
						<Form.Control
							type="text"
							value={readOnly
								? formatters.quantity.format(stackResource.quantity)
								: stackResource.quantity ?? ''}
							name="quantity"
							readOnly={readOnly}
							onChange={handleChange}
						/>
					</Form.Group>
				</Col>
			</Row>
		</Form>
	);
}