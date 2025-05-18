import { Form, Row, Col } from 'react-bootstrap';

import { useScheduleDataStore } from 'features/schedule';

import { CustomAccordion } from 'shared/ui/sementics';

export default function CombustionGasForm({ readOnly, LOCAL_KEY }) {
  const { measurementDataMap, setField, getMeasurementData } = useScheduleDataStore();

  return(
    <CustomAccordion title={"연소가스 분석기 Part"}>
      <div className="card p-3 mb-2" style={{ fontSize: "0.75rem", backgroundColor:"var(--sub-bg-color)"}}>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
          <Form.Label column sm="4">
            표준산소 (%)
          </Form.Label>
          <Col sm="8">
            <Form.Control readOnly defaultValue="20.9" />
          </Col>
        </Form.Group>
      </div>
      <Form.Group className="mb-3" controlId="oxygenConcentration">
        <Form.Label>O₂ (산소 측정값)</Form.Label>
        <div className="d-flex gap-2">
          <Form.Control type="number" placeholder="1차" />
          <Form.Control type="number" placeholder="2차" />
          <Form.Control type="number" placeholder="3차" />
        </div>
      </Form.Group>
      <Form.Group className="mb-3" controlId="carbonDioxideConcentration">
        <Form.Label>CO₂ (이산화탄소 측정값)</Form.Label>
        <div className="d-flex gap-2">
          <Form.Control type="number" placeholder="1차" />
          <Form.Control type="number" placeholder="2차" />
          <Form.Control type="number" placeholder="3차" />
        </div>
      </Form.Group>
      <Form.Group className="mb-3" controlId="carbonMonoxideConcentration">
        <Form.Label>CO (일산화탄소 측정값)</Form.Label>
        <div className="d-flex gap-2">
          <Form.Control type="number" placeholder="1차" />
          <Form.Control type="number" placeholder="2차" />
          <Form.Control type="number" placeholder="3차" />
        </div>
      </Form.Group>
    </CustomAccordion>
  );
}