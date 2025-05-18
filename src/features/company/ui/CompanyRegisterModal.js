import { useState } from 'react';
import { Form } from 'react-bootstrap';

import ModalContainer from 'shared/ui/modals/ModalContainer';

import { useCompanyEditor } from 'features/company';

import { updateCompanyListOnRegister } from 'features/company/lib/updateCompanyList';

import { CustomButton } from 'shared/ui/buttons';
import { handleSubmitEntity } from 'shared/lib/handleSubmitEntity';
import { formatters } from 'shared/utils/formatters';

export default function CompanyRegisterModal() {
  const [showModal, setShowModal] = useState(false);
  const {
    form: company,
    setForm: setCompany,
    errors,
    validate,
    reset
  } = useCompanyEditor({
    companyName: '',
    ceoName: '',
    bizNumber: '',
    address: ''
  });

  const updateCompanyField = (e) => {
    const { name, value } = e.target;
    const newValue = name === 'bizNumber' ? formatters.bizNumber.format(value) : value;

    setCompany((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = handleSubmitEntity({
    validate,
    api: () => updateCompanyListOnRegister(company),
    onSuccess: () => {
      alert('업체가 등록되었습니다!');
      setShowModal(false);
    },
  });

  const renderField = (label, name, isInvalid = false, placeholder = '') => (
    <Form.Group className="mb-2">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        name={name}
        value={company[name]}
        onChange={updateCompanyField}
        isInvalid={!!errors[name]}
        placeholder={placeholder}
      />
      <Form.Control.Feedback type="invalid">
        {errors[name]}
      </Form.Control.Feedback>
    </Form.Group>
  );

  return (
    <div>
      <div className='m-1'>
        <CustomButton text={'+ 업체 등록'} onClick={() => setShowModal(true)} />
      </div>
      <ModalContainer
        show={showModal}
        onClose={() => {
          setShowModal(false);
          reset();
        }}
        onSubmit={handleSubmit}
        title="측정대행 의뢰업체 등록"
      >
        <Form>
          {renderField('측정대행 의뢰업체(필수)', 'companyName', true)}
          {renderField('대표자', 'ceoName')}
          {renderField('사업지 주소', 'address')}
          {renderField('사업자번호', 'bizNumber', true, '000-00-00000')}
        </Form>
      </ModalContainer>
    </div>
  );
}
