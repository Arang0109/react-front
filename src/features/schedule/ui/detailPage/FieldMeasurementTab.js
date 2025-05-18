import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';

import { useScheduleDataStore } from 'features/schedule';
import { CustomButton } from 'shared/ui/buttons';
import { WeatherConditionForm, CombustionGasForm } from 'features/schedule';

import { initialMeasurementData } from 'features/schedule/model/ScheduleDataStore';

import cloneDeep from 'lodash/cloneDeep';

export default function FieldMeasurementTab({ LOCAL_KEY }) {
  const [readOnly, setReadOnly] = useState(true);
  const { measurementDataMap, setMeasurementData } = useScheduleDataStore();

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_KEY);

    try {
      const parsed = saved ? JSON.parse(saved) : null;
      const data = parsed || cloneDeep(initialMeasurementData);
      setMeasurementData(LOCAL_KEY, data);
    } catch {
      setMeasurementData(LOCAL_KEY, cloneDeep(initialMeasurementData));
    }
  }, [LOCAL_KEY, setMeasurementData]);

  const handleSave = () => {
    const data = measurementDataMap[LOCAL_KEY];

    if (!data) return alert('저장할 데이터가 없습니다.');

    localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
    alert('임시 저장 완료!');
  };

  return (
    <div>
      <CustomButton text="수정" onClick={() => setReadOnly(false)} />
      <hr />
      <Row>
        <Col sm={6} className='p-2'>
          <WeatherConditionForm readOnly={readOnly} LOCAL_KEY={LOCAL_KEY} />
        </Col>
        <Col sm={6} className='p-2'>
          <CombustionGasForm />
        </Col>
      </Row>
      <hr />
      <CustomButton text="임시 저장" onClick={handleSave} />
    </div>
  );
}