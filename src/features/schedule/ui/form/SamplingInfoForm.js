import { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import { Form, Row, Col } from 'react-bootstrap';
import makeAnimated from 'react-select/animated';

import { useWorkplaceStore } from 'features/workplace';
import { useStackStore } from "features/stack";
import customSelectStyle from 'shared/utils/customSelectStyle';

const { singleStyle, multiStyle } = customSelectStyle();
const animatedComponents = makeAnimated();

const purposeOptions = [
  { value: 'SELF', label: '자가측정용' },
  { value: 'REFERENCE', label: '기타참고용' },
];
export default function SamplingInfoForm({ updateField }) {
  const { workplaces, stacks, loadWorkplaces, loadWorkplaceDetail } = useWorkplaceStore();
  const { stackMeasurements, loadStackDetail, setStackMeasurements } = useStackStore();

  const [selectedWorkplace, setSelectedWorkplace] = useState(null);
  const [selectedStack, setSelectedStack] = useState(null);
  const [selectedPollutants, setSelectedPollutants] = useState([]);
  const [measureDate, setMeasureDate] = useState(new Date());

  useEffect(() => {
    loadWorkplaces();
  }, [loadWorkplaces]);

  useEffect(() => {
    updateField({ measureDate: measureDate.toISOString().slice(0, 10) });
    updateField({ measurementPurpose: purposeOptions[0].value });
  }, [measureDate, updateField]);

  const handleWorkplaceChange = async (selected) => {
    setSelectedWorkplace(selected);
    setSelectedStack(null);
    setSelectedPollutants([]);
    setStackMeasurements([]);

    updateField({
      workplaceId: selected.value,
      stackId: null,
      stackMeasurementIds: []
    });

    await loadWorkplaceDetail(selected.value);
  };

  const handleStackChange = async (selected) => {
    setSelectedStack(selected);
    setSelectedPollutants([]);

    updateField({
      stackId: selected.value,
      stackMeasurementIds: []
    });

    await loadStackDetail(selected.value);
  };

  const handlePollutantsChange = (selectedOptions) => {
    setSelectedPollutants(selectedOptions);
    const ids = selectedOptions.map(opt => opt.value);
    updateField({ stackMeasurementIds: ids });
  };

  const stackMeasurementOptions = stackMeasurements.map(sm => ({
    value: sm.stackMeasurementId,
    label: sm.pollutantNameKR
  }));

  return (
    <Form>
      <Row>
        <Col>
          <Form.Group controlId="measureDate" className="mb-3">
            <Form.Label className="common-label">측정일(채취일)</Form.Label>
            <DatePicker
              selected={measureDate}
              onChange={(date) => {
                setMeasureDate(date);
                updateField({ measureDate: date.toISOString().slice(0, 10) });
              }}
              dateFormat="yyyy-MM-dd"
              className="form-control"
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="measurementPurpose" className="mb-3">
            <Form.Label className="common-label">측정 용도</Form.Label>
            <Select
              options={purposeOptions}
              defaultValue={purposeOptions[0]}
              onChange={(selected) => updateField({ measurementPurpose: selected.value })}
              styles={singleStyle}
            />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group controlId="workplace" className="mb-3">
        <Form.Label className="common-label">측정대상 사업장</Form.Label>
        <Select
          options={workplaces.map(w => ({ value: w.workplaceId, label: w.workplaceName }))}
          value={selectedWorkplace}
          onChange={handleWorkplaceChange}
          styles={singleStyle}
          placeholder="사업장을 선택하세요."
        />
      </Form.Group>

      <Form.Group controlId="stack" className="mb-3">
        <Form.Label className="common-label">배출시설</Form.Label>
        <Select
          options={stacks.map(s => ({ value: s.stackId, label: s.stackName }))}
          value={selectedStack}
          onChange={handleStackChange}
          styles={singleStyle}
          placeholder="배출시설을 선택하세요."
          isDisabled={!selectedWorkplace}
        />
      </Form.Group>

      <Form.Group controlId="pollutants" className="mb-3">
        <Form.Label className="common-label">측정항목</Form.Label>
        <Select
          options={stackMeasurementOptions}
          value={selectedPollutants}
          onChange={handlePollutantsChange}
          components={animatedComponents}
          isMulti
          styles={multiStyle}
          placeholder="측정항목을 선택하세요."
        />
      </Form.Group>
    </Form>
  );
}