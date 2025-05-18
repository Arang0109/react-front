import { useState } from 'react';
import { Form } from 'react-bootstrap';

import { useStackEditor } from 'features/stack';
import { updateStackListOnRegister } from 'features/stack/lib/updateStackList';

import ModalContainer from 'shared/ui/modals/ModalContainer';
import { CustomButton } from 'shared/ui/buttons';
import { handleSubmitEntity } from 'shared/lib/handleSubmitEntity';

export default function StackRegisterModal({ workplace }) {
  const [showModal, setShowModal] = useState(false);
  const {
    form: stack,
    setForm: setStack,
    errors,
    validate,
    reset
  } = useStackEditor({
    workplaceId: workplace.workplaceId,
    stackName: '',
    stackType: '',
    stackSize: '',
    prevention: '',
    preventionCapacity: '',
    semsNumber: '',
  });

  const handleShowModal = () => {
    setShowModal(true);
  }

  const updateStackField = (e) => {
    const { name, value } = e.target;
    setStack((prev) => ({ ...prev, [name]: value}));
  }

  const handleSubmit = handleSubmitEntity({
    validate,
    api: () => updateStackListOnRegister(stack, workplace.workplaceId),
    onSuccess: async () => {
      alert('배출시설이 등록되었습니다.');
      setShowModal(false);
    },
  });

  return (
    <div>
      <div className="m-1">
      <CustomButton 
        text={'+ 배출시설 등록'} 
        onClick={handleShowModal} />
      </div>
      <ModalContainer
        show={showModal}
        onClose={() => {
          setShowModal(false);
          reset();
        }}
        onSubmit={handleSubmit}
        title="배출시설 등록"
        >
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>측정대상 사업장</Form.Label>
            <Form.Control
              name="workplaceName"
              value={workplace.workplaceName}
              onChange={updateStackField}
              readOnly
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>배출시설(필수)</Form.Label>
            <Form.Control
              name="stackName"
              value={stack.stackName ?? ''}
              onChange={updateStackField}
              isInvalid={!!errors.stackName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.stackName}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>배출시설 종류</Form.Label>
            <Form.Control
              name="stackType"
              value={stack.stackType ?? ''}
              onChange={updateStackField}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>배출시설 종별</Form.Label>
            <Form.Select
              name="stackSize"
              value={stack.stackSize}
              onChange={updateStackField}
              aria-label="사업장 종별">
              <option value="">선택하세요</option>
              <option value="1">1종</option>
              <option value="2">2종</option>
              <option value="3">3종</option>
              <option value="4">4종</option>
              <option value="5">5종</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>방지시설</Form.Label>
            <Form.Control
              name="prevention"
              value={stack.prevention ?? ''}
              onChange={updateStackField}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>방지시설 용량</Form.Label>
            <Form.Control
              name="preventionCapacity"
              value={stack.preventionCapacity ?? ''}
              onChange={updateStackField}
              isInvalid={!!errors.preventionCapacity}
            />
            <Form.Control.Feedback type="invalid">
              {errors.preventionCapacity}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>연료 사용량</Form.Label>
            <Form.Control
              name="fuelUsage"
              value={stack.fuelUsage ?? ''}
              onChange={updateStackField}
              isInvalid={!!errors.fuelUsage}
            />
            <Form.Control.Feedback type="invalid">
              {errors.fuelUsage}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </ModalContainer>
    </div>
  );
}
