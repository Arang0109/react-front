import { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import { Form, Row, Col } from 'react-bootstrap';
import makeAnimated from 'react-select/animated';

import { useWorkplaceStore } from 'features/workplace'
import { useStackStore } from "features/stack";
import { MeasurementPurposeSelect } from 'features/schedule';

import customSelectStyle from 'shared/utils/customSelectStyle'; 

const { singleStyle, multiStyle } = customSelectStyle();

export default function SamplingInfoForm({ setStack, updateField, teamId }) {
  const { workplaces, stacks, loadWorkplaces, loadWorkplaceDetail } = useWorkplaceStore();
  const { stack, stackMeasurements, setStackMeasurements, loadStackDetail } = useStackStore();

  const [selectedWorkplace, setSelectedWorkplace] = useState(null);
  const [selectedStack, setSelectedStack] = useState(stack);
  const [selectedPollutants, setSelectedPollutants] = useState([]);
  const [startDate, setStartDate] = useState(new Date());

  const animatedComponents = makeAnimated()

  const stackMeasurementOptions = stackMeasurements.map(stackMeasurement => ({
    value: stackMeasurement.stackMeasurementId,
    label: stackMeasurement.pollutantNameKR,
  }));

  useEffect(() => {
    loadWorkplaces();
  }, [loadWorkplaces]);

  useEffect(() => {
    updateField({ measureDate: startDate.toISOString().slice(0, 10) });
  }, [startDate, updateField]);

  const workplaceOptions = workplaces.map(workplace => ({
    value: workplace.workplaceId,
    label: workplace.workplaceName,
  }));

  const stackOptions = stacks.map(stack => ({
    value: stack.stackId,
    label: stack.stackName,
  }));

  const handleWorkplaceChange = (selectedOption) => {
    setSelectedWorkplace(selectedOption);
    setSelectedStack(null);
    setStackMeasurements([]);
    setSelectedPollutants([]);
    loadWorkplaceDetail(selectedOption.value);
  };

  const handleStackChange = async (selectedOption) => {
    setSelectedStack(selectedOption);
    await loadStackDetail(selectedOption.value); 
    setStack(useStackStore.getState().stack);
    setSelectedPollutants([]);
  };

  return(
    <Form>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="measureDate">
            <Form.Label className='common-label'>측정일(채취일)</Form.Label>
            <DatePicker
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
                updateField({ measureDate: startDate.toISOString().slice(0, 10) });
              }}
              dateFormat="yyyy-MM-dd"
              className="form-control"
            />
          </Form.Group>
        </Col>
        <Col>
          <MeasurementPurposeSelect />
        </Col>
      </Row>
      <Row>
        <Form.Group className="mb-3" controlId="workplaceName">
          <Form.Label className='common-label'>측정대상 사업장</Form.Label>
          <Select
            options={workplaceOptions}
            value={selectedWorkplace}
            onChange={handleWorkplaceChange}
            styles={singleStyle}
            placeholder="사업장을 선택하세요."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="stackName">
          <Form.Label className='common-label'>배출시설</Form.Label>
          <Select
            options={stackOptions}
            value={selectedStack}
            onChange={handleStackChange}
            styles={singleStyle}
            placeholder="배출시설을 선택하세요."
            isDisabled={!selectedWorkplace}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="pollutants">
          <Form.Label className='common-label'>측정항목</Form.Label>
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            options={stackMeasurementOptions}
            value={selectedPollutants}
            onChange={(selectedOptions) => {
              setSelectedPollutants(selectedOptions);

              const schedules = selectedOptions.map((option) => ({
                stackMeasurementId: option.value,
              }));
            
              updateField({ scheduledMeasurements: schedules });
            }}
            isMulti
            styles={multiStyle}
            placeholder="측정항목을 선택하세요."
          />
        </Form.Group>
      </Row>
    </Form>
    
  );
}