import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { Stack } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';

import { Form, Row, Col, FloatingLabel, Tab, Tabs } from 'react-bootstrap';
import { FaTemperatureHigh, FaWind } from "react-icons/fa";
import { FaGlassWaterDroplet } from "react-icons/fa6";

import { CustomAccordion } from 'shared/ui/sementics';

export default function ScheduleDetail() {
  const [startTime, setStartTime] = useState(dayjs('00:00', 'HH:mm'));
  const [endTime, setEndTime] = useState(dayjs('00:00', 'HH:mm'));
  const [key, setKey] = useState('home');
  const { groupedScheduleId } = useParams();

  const [pressure, setPressure] = useState('');
  const mmHg = pressure ? (parseFloat(pressure) * 0.75006).toFixed(1) : '';

  return(
    <div className="container-fluid mt-4">
      <div className="border p-4" style={{
        backgroundColor: 'var(--bg-color)',
        color: 'var(--text-color)'
      }}>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          <Tab eventKey="home" title="기본정보">
            기본 정보
          </Tab>
          <Tab eventKey="profile" title="현장측정">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack direction="row" spacing={2} sx={{ mb: 3, '& > *': {
      minWidth: 150, // ✅ 자식 모두 최소 150px
      flex: '1 1 auto'
    } }}>
                <TimePicker
                  label="시작 시간"
                  value={startTime}
                  onChange={setStartTime}
                  ampm={false}
                />
                <TimePicker
                  label="종료 시간"
                  value={endTime}
                  onChange={setEndTime}
                  ampm={false}
                />
              </Stack>
            </LocalizationProvider>
            <CustomAccordion title={"기상조건"}>
              <Form>
                <Row>
                  <Col sm={2}>
                    <Form.Group controlId="weather" className="mb-3">
                      <Form.Select className="form-control" style={{ height: '58px' }}>
                        <option>날씨</option>
                        <option>맑음</option>
                        <option>흐림</option>
                        <option>비</option>
                        <option>눈</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col sm={2}>
                    <FloatingLabel
                      controlId="temperature"
                      label={(
                        <span>
                          기온
                          <FaTemperatureHigh style={{ marginLeft: '6px' }} />
                        </span>
                      )}
                      className="mb-3"
                    >
                      <Form.Control type="text" placeholder="기온" />
                    </FloatingLabel>
                  </Col>
                  <Col sm={2}>
                    <FloatingLabel
                      controlId="humidity"
                      label={(
                        <span>
                          습도
                          <FaGlassWaterDroplet style={{ marginLeft: '6px' }} />
                        </span>
                      )}
                      className="mb-3"
                    >
                      <Form.Control type="text" placeholder="습도" />
                    </FloatingLabel>
                  </Col>
                  <Col sm={2}>
                    <FloatingLabel
                      controlId="atmosphericPressure"
                      label="대기압 [Hpa]"
                      className="mb-3"
                    >
                      <Form.Control
                        type="text"
                        placeholder="대기압"
                        value={pressure}
                        onChange={(e) => setPressure(e.target.value)}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col sm={2}>
                    <Form.Group controlId="windDirection" className="mb-3">
                      <Form.Select className="form-control" style={{ height: '58px' }}>
                        <option>정온</option>
                        <option>동</option>
                        <option>서</option>
                        <option>남</option>
                        <option>북</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col sm={2}>
                    <FloatingLabel
                      controlId="windVelocity"
                      label={(
                        <span>
                          풍속
                          <FaWind style={{ marginLeft: '6px' }} />
                        </span>
                      )}
                      className="mb-3"
                    >
                      <Form.Control type="text" placeholder="풍속" />
                    </FloatingLabel>
                  </Col>
                </Row>
              </Form>
              
              <div style={{ fontSize: '0.85rem', marginBottom: '0.25rem', color: 'gray' }}>
                ※ 계산 기준: 1 Hpa ≈ 0.75006 mmHg → 환산값: <b>{mmHg} mmHg</b>
              </div>
            </CustomAccordion>
          </Tab>
          <Tab eventKey="contact" title="실험 및 분석">
            Tab content for Contact
          </Tab>
        </Tabs>
        
      </div>
    </div>
  );
}