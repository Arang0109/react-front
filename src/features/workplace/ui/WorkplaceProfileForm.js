import { Form, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { updateWorkplace, deleteWorkplace } from "features/workplace/api/WorkplaceApi";

import { useWorkplaceEditor } from "features/workplace"

import useEditModeToggle from "shared/hooks/useEditModeToggle";
import { handleDeleteEntity } from 'shared/lib/handleDeleteEntity';
import { CustomButton } from 'shared/ui/buttons';

export default function WorkplaceProfileForm({ workplace: initialWorkplace, workplaceId }) {
	const navigate = useNavigate();

	const {
		form: workplaceForm,
		setForm: setWorkplaceForm,
		errors,
		validate
	} = useWorkplaceEditor(initialWorkplace);

	const { readOnly, buttonText, handleModify } = useEditModeToggle(
		workplaceForm,
		validate,
		() => updateWorkplace(workplaceForm)
	);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setWorkplaceForm((prev) => ({ ...prev, [name]: value }));
	};

	const renderField = (colSize, label, name, isInvalid = false) => (
		<Col md={colSize}>
			<Form.Group controlId={name}>
				<Form.Label>{label}</Form.Label>
				<Form.Control
					type="text"
					value={workplaceForm[name]}
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
						id: workplaceId,
						deleteFn: deleteWorkplace,
						redirectPath: `/companies/${workplaceForm.companyId}`,
						navigate,
						entityName: '사업장'
					});
				}} />
			</div>
			<Form>
				<Row className="mb-3">
					{renderField(6, '측정대상 사업장(필수)', 'workplaceName', true)}
					{renderField(6, '사업지 주소', 'address')}
				</Row>
				<Row className="mb-3">
					{renderField(4, '업종', 'businessType')}
					{renderField(4, '주생산 품목', 'mainProduction')}
					<Col md={4}>
						<Form.Group controlId="workplaceSize">
							<Form.Label>사업장 종별</Form.Label>
							<Form.Select
								name="workplaceSize"
								value={workplaceForm.workplaceSize ?? ""}
								disabled={readOnly}
								onChange={handleChange}
								aria-label="사업장 종별">
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
			</Form>
		</div>
	)
}