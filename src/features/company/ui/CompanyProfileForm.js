import { Form, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { updateCompany, deleteCompany } from "features/company/api/CompanyApi";

import { useCompanyEditor } from "features/company";

import useEditModeToggle from "shared/hooks/useEditModeToggle";
import { handleDeleteEntity } from 'shared/lib/handleDeleteEntity';
import { CustomButton } from 'shared/ui/buttons';
import { formatters } from 'shared/utils/formatters';

export default function CompanyProfileForm({ company: initialCompany, companyId }) {
  const navigate = useNavigate();

	const {
    form: companyForm,
    setForm: setCompanyForm,
    errors,
    validate
  } = useCompanyEditor(initialCompany);

  const { readOnly, buttonText, handleModify } = useEditModeToggle(
    companyForm,
    validate,
    () => updateCompany(companyForm)
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === 'bizNumber' ? formatters.bizNumber.format(value) : value;

    setCompanyForm((prev) => ({ ...prev, [name]: newValue }));
  };

  const renderField = (label, name, isInvalid = false) => (
    <Col md={6}>
      <Form.Group controlId={name}>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          type="text"
          value={companyForm[name]}
          name={name}
          isInvalid={!!errors[name]}
          readOnly={readOnly}
          onChange={handleChange}
        />
        <Form.Control.Feedback type="invalid">
          {errors[name]}
        </Form.Control.Feedback>
      </Form.Group>
    </Col>
  );

  return (
    <div>
      <div className="my-2">
        <CustomButton text={buttonText} onClick={handleModify} />
        <CustomButton text={'삭제'} onClick={() => {
					handleDeleteEntity({
						id: companyId,
						deleteFn: deleteCompany,
						redirectPath: '/companies',
						navigate,
						entityName: '업체'
					});
				}} />
      </div>
      <Form>
        <Row className="mb-3">
          {renderField('측정대행 의뢰업체(필수)', 'companyName', true)}
          {renderField('사업지 주소', 'address')}
        </Row>
        <Row className="mb-3">
          {renderField('대표자', 'ceoName')}
          {renderField('사업자번호', 'bizNumber', true)}
        </Row>
      </Form>
    </div>
  );
}
