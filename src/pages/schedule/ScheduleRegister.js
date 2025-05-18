import { useState, useCallback } from "react";
import { Row, Col } from "react-bootstrap";

import { createSchedule } from "features/schedule/api/ScheduleApi";
import { SamplingInfoForm, TeamInfoForm, StackOverview } from "features/schedule";

import { CustomButton } from "shared/ui/buttons";

export default function ScheduleRegister() {
  const [stack, setStack] = useState([]);
  const [teamId, setTeamId] = useState('');
  const [scheduleForm, setScheduleForm] = useState({
    teamId: null,
    measureDate: null,
    scheduledMeasurements: [],
  });

  const updateField = useCallback((updater) => {
    setScheduleForm((prev) => {
      if (typeof updater === 'function') {
        return updater(prev);
      }
      return { ...prev, ...updater };
    });
  }, []);
  
  
  return(
    <div className="container-fluid mt-4">
      <div className="border p-4" style={{
        backgroundColor: 'var(--bg-color)',
        color: 'var(--text-color)'
      }}>
        <h4 className="fw-bold">일정 등록</h4>
        <hr/>
        <div style={{
          fontSize: "0.75rem"
        }}>
          <Row style={{ display: 'flex', minHeight: '600px' }}>
            <Col md={6} style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ flex: 1, backgroundColor: 'var(--bg-color)', color: 'var(--text-color)', padding: '1rem' }}>
                <div className="sub-title p-2">시료채취정보</div>
                <div className="border p-4" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
                  <SamplingInfoForm setStack={setStack} teamId={teamId} updateField={updateField} />
                </div>
              </div>
              <div style={{ flex: 1, backgroundColor: 'var(--bg-color)', color: 'var(--text-color)', padding: '1rem' }}>
                <div className="sub-title p-2">출장인력 및 장비</div>
                <div className="border p-4" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
                  <TeamInfoForm updateField={updateField} setTeamId={setTeamId} />
                </div>
              </div>
            </Col>
            <Col md={6} style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, backgroundColor: 'var(--bg-color)', color: 'var(--text-color)', padding: '1rem' }}>
                <StackOverview stack={stack} />
              </div>
            </Col>
          </Row>
        </div>
        <hr />
        <CustomButton
          text={'등록'}
          onClick={() => {
            const payload = {
              groupedSchedule: {
                stackId: stack?.stackId,
                teamId: scheduleForm.teamId,
                measureDate: scheduleForm.measureDate,
                status: 'MEASURING',
                completed: false,
              },
              scheduledMeasurements: scheduleForm.scheduledMeasurements,
            };

            console.log("scheduleForm", scheduleForm);
            console.log("payload", JSON.stringify(payload, null, 2));
            createSchedule(payload);
          }} />
      </div>
    </div>
  );
}