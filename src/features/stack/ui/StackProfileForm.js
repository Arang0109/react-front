import { Form, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { updateStack, deleteStack } from "features/stack/api/StackApi";

import { useStackEditor, StackResourceForm } from "features/stack";

import useEditModeToggle from "shared/hooks/useEditModeToggle";
import { handleDeleteEntity } from 'shared/lib/handleDeleteEntity';
import { CustomButton } from 'shared/ui/buttons';
import { CustomAccordion } from "shared/ui/sementics"
import { formatters } from 'shared/utils/formatters';

export default function StackProfileForm({ stack: initialStack, stackId }) {
	const navigate = useNavigate();

	const {
		form: stackForm,
		setForm: setStackForm,
		errors,
		validate
	} = useStackEditor(initialStack);

	const { readOnly, buttonText, handleModify } = useEditModeToggle(
		stackForm,
		validate,
		() => updateStack(stackForm)
	);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setStackForm((prev) => ({ ...prev, [name]: value }));
	};

	const renderField = (label, name, isInvalid = false) => (
		<Col md={4}>
			<Form.Group controlId={name}>
				<Form.Label>{label}</Form.Label>
				<Form.Control
					type="text"
					value={stackForm[name] ?? ''}
					name={name}
					isInvalid={!!errors[name]}
					readOnly = {readOnly}
					onChange={handleChange}/>
			</Form.Group>
		</Col>
	);

	return(
		<div>
			<div className="my-2">
				<CustomButton text={buttonText} onClick={handleModify} />
				<CustomButton text={'삭제'} onClick={() => {
					handleDeleteEntity({
						id: stackId,
						deleteFn: deleteStack,
						redirectPath: `/workplaces/${stackForm.workplaceId}`,
						navigate,
						entityName: '배출시설'
					});
				}} />
			</div>
			<CustomAccordion
					title={'배출시설 정보'}>
				<Form>
					<Row className="mb-3">
						{renderField('시설명(필수)', 'stackName', true)}
						{renderField('배출시설', 'stackType')}
						<Col md={4}>
							<Form.Group controlId="stackSize">
								<Form.Label>배출구 종별</Form.Label>
								<Form.Select
									name="stackSize"
									value={stackForm.stackSize ?? ""}
									disabled={readOnly}
									onChange={handleChange}
									aria-label="배출시설 종별">
									<option value="">선택하세요</option>
									<option value="1">1종</option>
									<option value="2">2종</option>
									<option value="3">3종</option>
									<option value="4">4종</option>
									<option value="5">5종</option>
								</Form.Select>
							</Form.Group>
						</Col>
					</Row>
					<Row className="mb-3">
						{renderField('방지시설', 'prevention')}
						<Col md={4}>
							<Form.Group controlId="preventionCapacity">
								<Form.Label>방지시설 용량</Form.Label>
								<Form.Control
									type="text"
									value={readOnly
										? formatters.quantity.format(stackForm.preventionCapacity)
										: stackForm.preventionCapacity ?? ''}
									name="preventionCapacity"
									readOnly={readOnly}
									onChange={handleChange}
								/>
							</Form.Group>
						</Col>
						{renderField('sems 번호', 'semsNumber')}
					</Row>
				</Form>
			</CustomAccordion>
			<div className='m-2'></div>
			<CustomAccordion
				title={'배출시설 재원'}>
				<StackResourceForm 
					stackResource={stackForm.stackInformation}
					setStackForm={setStackForm}
					readOnly={readOnly}/>
			</CustomAccordion>
		</div>
	)
}