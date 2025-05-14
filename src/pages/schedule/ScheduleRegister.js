import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { createSchedule } from "features/schedule/api/ScheduleApi";

import { SamplingInfoForm, TeamInfoForm } from "features/schedule/ui";
import { CustomButton } from "shared/ui/buttons";

const initialRegisterFormState = {
  workplaceId: null,
  teamId: null,
  measureDate: null,
  measurementPurpose: null,
  stackId: null,
  stackMeasurementIds: [],
  staffIds: [],
};

export default function ScheduleRegister() {
  const [registerForm, setRegisterForm] = useState(initialRegisterFormState);
  const navigate = useNavigate();

  const updateField = useCallback((patch) => {
    setRegisterForm(prev => ({ ...prev, ...patch }));
  }, []);

  const handleSubmit = () => {
    const payload = {
      scheduledWorkplace: {
        workplaceId: registerForm.workplaceId,
        teamId: registerForm.teamId,
        measureDate: registerForm.measureDate,
        measurementPurpose: registerForm.measurementPurpose,
      },
      scheduledStack: {
        stackId: registerForm.stackId,
      },
      stackMeasurementIds: registerForm.stackMeasurementIds,
      staffIds: registerForm.staffIds,
    };

    console.log("📦 Payload", JSON.stringify(payload, null, 2));
    createSchedule(payload)
      .then(response => {
        if (response.success) {
          console.log("✅ 일정 등록 성공");
          navigate({
            pathname: `../schedules/atmosphere`
          });
        } else {
          console.error("❌ 실패:", response.message);
        }
      })
      .catch(error => {
        console.error("❌ 에러 발생:", error);
      });
    // navigate
  };  
  
  return (
    <div className="container-fluid mt-4">
      <div className="border p-4" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
        <h4 className="fw-bold">일정 등록</h4>
        <hr />
        <Row style={{ minHeight: '600px' }}>
          <Col md={6} className="d-flex flex-column gap-3">
            <Section title="시료채취정보">
              <SamplingInfoForm updateField={updateField} />
            </Section>
          </Col>
          <Col md={6}>
            <Section title="출장인력 및 장비">
              <TeamInfoForm updateField={updateField} />
            </Section>
          </Col>
        </Row>
        <hr />
        <CustomButton text="등록" onClick={handleSubmit} />
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ flex: 1, backgroundColor: 'var(--bg-color)', color: 'var(--text-color)', padding: '1rem', fontSize: '0.75rem' }}>
      <div className="sub-title p-2">{title}</div>
      <div className="border p-4" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>{children}</div>
    </div>
  );
}