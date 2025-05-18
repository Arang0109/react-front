import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Row, Col } from "react-bootstrap";

import { deleteStackMeasurements } from "features/stack/api/StackMeasurementApi";
import { StackMeasurementsSelect, useStackStore, useStackMeasurementEditor }  from "features/stack";
import { updateStackMeasurementListOnRegister } from 'features/stack/lib/updateStackMeasurementList';

import { CustomButton } from "shared/ui/buttons";
import ModalContainer from "shared/ui/modals/ModalContainer";
import { handleSubmitEntity } from "shared/lib/handleSubmitEntity";
import { handleGroupDeleteEntity } from 'shared/lib/handleGroupDeleteEntity';

export default function StackMeasurementRegisterModal({ selectedMeasurements, stackMeasurements, stackId }) {
	const [showModal, setShowModal] = useState(false);
  const [isMeasured, setIsMeasured] = useState(false);
  const {
    form: stackMeasurement,
    setForm: setStackMeasurement,
    errors,
    validate,
    reset
  } = useStackMeasurementEditor({
    stackId: stackId,
    pollutantId: '',
    cycleType: '',
    allowValue: '',
    oxygenConcentration: '',
    isMeasured: true,
  });

  const navigate = useNavigate();

  const updateStackMeasurementField = (e) => {
    const { name, value } = e.target;
    setStackMeasurement((prev) => ({ ...prev, [name]: value}));
  }

	const handleSubmit = handleSubmitEntity({
    validate,
    api: () => updateStackMeasurementListOnRegister(stackMeasurement, stackId),
    onSuccess: async () => {
      alert('측정항목이 추가되었습니다.');
      setShowModal(false);
    }
  });

	const handleShowModal = () => {
    setShowModal(true);
  }

  const handleIsMeasuredChange = (e) => {
    const checked = e.target.checked;
    setIsMeasured(checked);
  
    setStackMeasurement((prev) => ({
      ...prev,
      isMeasured: checked ? false : true,
      cycleType: checked ? "nomeasure" : "",
    }));
  };
  

  const alreadyAddedPollutantIds = Object.values(stackMeasurements)
    .flat()
    .map(m => m.pollutantId);

  return(
    <div>
      <CustomButton
        text={'항목 추가'}
        onClick={handleShowModal} />
      <CustomButton
        text={'항목 삭제'}
        onClick={() => {
          handleGroupDeleteEntity({
            data: selectedMeasurements,
            deleteFn: async (selectedMeasurements) => {
              await deleteStackMeasurements(selectedMeasurements);
          
              const { loadStackDetail } = useStackStore.getState();
              await loadStackDetail(stackId);
            },
            redirectPath: `/stacks/${stackId}`,
            navigate
          });
        }} />
      <ModalContainer
				show={showModal}
				onClose={() => {
          setShowModal(false)
          reset();
        }}
				onSubmit={handleSubmit}
				title="측정항목 추가"
				size="lg">
        <p>배출 오염물질</p>
        <StackMeasurementsSelect
          onChange={(selected) => {
            if (selected && selected.value) {
              setStackMeasurement((prev) => ({
                ...prev,
                pollutantId: selected.value,
              }));
            } else {
              setStackMeasurement((prev) => ({
                ...prev,
                pollutantId: '',
              }));
            }
          }} 
          excludedIds={alreadyAddedPollutantIds}/>
        <hr />
        <Form>
					<Row className="mb-3">
            <Col md={3}>
              <Form.Group controlId="allowValue">
                <Form.Label>허용 기준치</Form.Label>
                <Form.Control
                  type="text"
                  name="allowValue"
                  onChange={updateStackMeasurementField}
                  isInvalid={!!errors.allowValue}/>
                <Form.Control.Feedback type="invalid">
                  {errors.allowValue}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId="oxygenConcentration">
                <Form.Label>표준산소농도</Form.Label>
                <Form.Control
                  type="text"
                  name="oxygenConcentration"
                  onChange={updateStackMeasurementField}
                  isInvalid={!!errors.oxygenConcentration}/>
                <Form.Control.Feedback type="invalid">
                  {errors.oxygenConcentration}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
            <Form.Group controlId="cycleType">
								<Form.Label>측정 주기</Form.Label>
                  <Form.Select
                    name="cycleType"
                    aria-label="측정 주기"
                    onChange={updateStackMeasurementField}
                    disabled={isMeasured}
                    value={stackMeasurement.cycleType}
                    >
									<option value="">선택하세요</option>
									<option value="monthly">1회/월</option>
									<option value="quarterly">1회/분기</option>
									<option value="semiannual">1회/반기</option>
									<option value="annual">1회/연</option>
									<option value="twiceamonth">2회/월</option>
                  <option value="onceinfebruary">1회/2월</option>
                  <option value="additional">추가측정</option>
								</Form.Select>
							</Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="isMeasured">
                <Form.Check
                  type="switch"
                  id="isMeasured"
                  label="미측정 항목"
                  checked={isMeasured}
                  onChange={handleIsMeasuredChange}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </ ModalContainer>
    </div>

  );
}