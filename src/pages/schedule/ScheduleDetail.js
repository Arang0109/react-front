import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tab, Tabs } from 'react-bootstrap';

import { FieldMeasurementTab, BasicInformation } from 'features/schedule';

export default function ScheduleDetail() {
  const [key, setKey] = useState('basicInformation');
  const { scheduledWorkplaceId, scheduledStackId } = useParams();

  const LOCAL_KEY = scheduledWorkplaceId && scheduledStackId
  ? `scheduleForm_${scheduledWorkplaceId}__${scheduledStackId}`
  : null;

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
          <Tab eventKey="basicInformation" title="기초정보">
            <BasicInformation LOCAL_KEY={LOCAL_KEY} />
          </Tab>
          {LOCAL_KEY && (
            <Tab eventKey="fieldData" title="현장측정 데이터">
              <FieldMeasurementTab LOCAL_KEY={LOCAL_KEY} />
            </Tab>
          )}
          <Tab eventKey="labData" title="실험 및 분석 데이터">
            Tab content for Contact
          </Tab>
        </Tabs>
        
      </div>
    </div>
  );
}