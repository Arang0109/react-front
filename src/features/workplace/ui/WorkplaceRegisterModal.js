import { useState } from 'react';
import { Form } from 'react-bootstrap';

import { useWorkplaceEditor } from 'features/workplace';
import { updateWorkplaceListOnRegister } from 'features/workplace/lib/updateWorkplaceList';

import ModalContainer from 'shared/ui/modals/ModalContainer';
import { CustomButton } from 'shared/ui/buttons';
import { handleSubmitEntity } from 'shared/lib/handleSubmitEntity';

export default function WorkplaceRegisterModal({ company }) {
  const [showModal, setShowModal] = useState(false);
  const {
    form: workplace,
    setForm: setWorkplace,
    errors,
    validate,
    reset
  } = useWorkplaceEditor({
    companyId: company.companyId,
    workplaceName: '',
    businessType: '',
    mainProduction: '',
    address: '',
  });

  const handleShowModal = () => {
    setShowModal(true);
  }

  const updateWorkplaceField = (e) => {
    const { name, value } = e.target;
    setWorkplace((prev) => ({ ...prev, [name]: value}));
  }

  const handleSubmit = handleSubmitEntity({
    validate,
    api: () => updateWorkplaceListOnRegister(workplace, company.companyId),
    onSuccess: async () => {
      alert('사업장이 등록되었습니다.');
      setShowModal(false);
    },
  });

  return (
    <div>
      <div className="m-1">
      <CustomButton 
        text={'+ 사업장 등록'} 
        onClick={handleShowModal} />
      </div>
      <ModalContainer
        show={showModal}
        onClose={() => {
          setShowModal(false);
          reset();
        }}
        onSubmit={handleSubmit}
        title="측정대상 사업장 등록">
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>측정대행 의뢰업체</Form.Label>
            <Form.Control
              name="companyName"
              value={company.companyName}
              onChange={updateWorkplaceField}
              readOnly
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>측정대상 사업장(필수)</Form.Label>
            <Form.Control
              name="workplaceName"
              value={workplace.workplaceName}
              onChange={updateWorkplaceField}
              isInvalid={!!errors.workplaceName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.workplaceName}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>주소</Form.Label>
            <Form.Control
              name="address"
              value={workplace.address}
              onChange={updateWorkplaceField}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>업종</Form.Label>
            <Form.Control
              name="businessType"
              value={workplace.businessType}
              onChange={updateWorkplaceField}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>주생산 품목</Form.Label>
            <Form.Control
              name="mainProduction"
              value={workplace.mainProduction}
              onChange={updateWorkplaceField}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>사업장 종별</Form.Label>
            <Form.Select
              name="workplaceSize"
              value={workplace.workplaceSize}
              onChange={updateWorkplaceField}
              aria-label="사업장 종별">
              <option value="">선택하세요</option>
              <option value="1">1종</option>
              <option value="2">2종</option>
              <option value="3">3종</option>
              <option value="4">4종</option>
              <option value="5">5종</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </ModalContainer>
    </div>
  );
}
