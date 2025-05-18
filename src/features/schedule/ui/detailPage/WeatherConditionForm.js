import { Form, Row, Col, FloatingLabel } from 'react-bootstrap';
import { FaTemperatureHigh, FaWind } from "react-icons/fa";
import { FaGlassWaterDroplet } from "react-icons/fa6";

import { useScheduleDataStore } from 'features/schedule';

import { formatters } from 'shared/utils/formatters';
import { CustomAccordion } from 'shared/ui/sementics';

export default function WeatherConditionForm({ readOnly, LOCAL_KEY }) {
  const { measurementDataMap, setField, getMeasurementData } = useScheduleDataStore();

  const measurementData = measurementDataMap[LOCAL_KEY] || {};

  const weatherData = measurementData?.weather ?? {};

  const weather = weatherData.weather
  const airTemp = weatherData.airTemperature || '';
  const humidity = weatherData.humidity || '';
  const windSpeed = weatherData.windSpeed || '';
  const windDirection = weatherData.windDirection || '';
  const atmosphericPressure = weatherData.atmosphericPressure || '';

  const getFormattedValue = (raw, formatter) =>
    readOnly ? (raw ? formatter.format(raw) : '') : raw || '';

  const hPa = getMeasurementData(LOCAL_KEY)?.weather?.atmosphericPressure;
  const mmHg = hPa ? (parseFloat(hPa) * 0.75006).toFixed(1) : null;

  return(
    <CustomAccordion title={"기상 조건 Part"}>
      <div className="card p-3 mb-3" style={{ fontSize: "0.75rem", backgroundColor:"var(--sub-bg-color)"}}>
        <p>대기압 환산</p>
        {hPa ? (
          <p>
            현재 대기압: <strong>{hPa} hPa</strong><br />
            환산 결과: <strong style={{ color: "red" }}>{mmHg} mmHg</strong><br />
            (공식: 1 hPa = 0.75006 mmHg)
          </p>
          ) : (
            <p>대기압 값이 입력되지 않았습니다.</p>
          )}
      </div>
      <Form>
        <Row>
          <Col sm={6}>
            <Form.Group controlId="weather" className="mb-3">
              <Form.Select className="form-control" style={{ height: '58px' }}
                value={weather || ''}
                onChange={(e) => setField(LOCAL_KEY, 'weather', 'weather', e.target.value)}
                disabled={readOnly}
              >
                <option>날씨</option>
                <option>맑음</option>
                <option>흐림</option>
                <option>비</option>
                <option>눈</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col sm={6}>
            <FloatingLabel
              controlId="atmosphericPressure"
              label="대기압 [Hpa]"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="대기압"
                value={getFormattedValue(atmosphericPressure, formatters.pressureHpa)}
                onChange={(e) => {
                  const raw = formatters.pressureHpa.unformat(e.target.value);
                  setField(LOCAL_KEY, 'weather', 'atmosphericPressure', raw);
                }}
                readOnly={readOnly}
              />
            </FloatingLabel>
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
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
              <Form.Control
                type="text"
                placeholder="습도"
                value={getFormattedValue(humidity, formatters.humidity)}
                onChange={(e) => {
                  const raw = formatters.humidity.unformat(e.target.value);
                  setField(LOCAL_KEY, 'weather', 'humidity', raw);
                }}
                readOnly={readOnly}
              />
            </FloatingLabel>
          </Col>
          <Col sm={6}>
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
              <Form.Control
                type="text"
                placeholder="기온"
                value={getFormattedValue(airTemp, formatters.airTemperature)}
                onChange={(e) => {
                  const raw = formatters.airTemperature.unformat(e.target.value);
                  setField(LOCAL_KEY, 'weather', 'airTemperature', raw);
                }}
                readOnly={readOnly} />
            </FloatingLabel>
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <Form.Group controlId="windDirection" className="mb-3">
              <Form.Select
                className="form-control"
                style={{ height: '58px' }}
                value={windDirection || ''}
                onChange={(e) => setField(LOCAL_KEY, 'weather', 'windDirection', e.target.value)}
                disabled={readOnly}
              >
                <option value="">정온</option>
                <option value="동">동 - E</option>
                <option value="서">서 - W</option>
                <option value="남">남 - S</option>
                <option value="북">북 - N</option>
                <option value="남동">남동 - SE</option>
                <option value="남서">남서 - SW</option>
                <option value="북동">북동 - NE</option>
                <option value="북서">북서 - NW</option>
                <option value="남남동">남남동 - SSE</option>
                <option value="동남동">동남동 - ESE</option>
                <option value="남남서">남남서 - SSW</option>
                <option value="서남서">서남서 - WSW</option>
                <option value="북북동">북북동 - NNE</option>
                <option value="동북동">동북동 - ENE</option>
                <option value="북북서">북북서 - NNW</option>
                <option value="서북서">서북서 - WNW</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col sm={6}>
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
              <Form.Control
                type="text"
                placeholder="풍속"
                value={getFormattedValue(windSpeed, formatters.windSpeed)}
                onChange={(e) => {
                  const raw = formatters.windSpeed.unformat(e.target.value);
                  setField(LOCAL_KEY, 'weather', 'windSpeed', raw);
                }}
                readOnly={readOnly}
              />
            </FloatingLabel>
          </Col>
        </Row>
      </Form>
    </CustomAccordion>
  );
}