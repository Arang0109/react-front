import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useScheduledStackStore } from 'features/schedule';
import { ScheduledStackListTable } from "features/schedule";
import { WorkplaceProfileForm } from "features/workplace";

export default function ScheduledStack() {
  const { scheduledWorkplaceId } = useParams();

  const scheduledStacks = useScheduledStackStore((state) => state.scheduledStacks);
  const workplace = useScheduledStackStore((state) => state.workplace);
  const loadScheduledStacks = useScheduledStackStore((state) => state.loadScheduledStacks);

  useEffect(() => {
    loadScheduledStacks(scheduledWorkplaceId);
  }, [scheduledWorkplaceId, loadScheduledStacks]);

  if (!workplace) {
    return <div>로딩 중...</div>;
  }

  return(
    <div className="container-fluid mt-4">
      <div className="border p-4" style={{
        backgroundColor: 'var(--bg-color)',
        color: 'var(--text-color)'
      }}>
        <h4 className="fw-bold">현장측정 분석목록 상세 (대기)</h4>
        <hr />
        <WorkplaceProfileForm workplace={workplace} workplaceId={workplace.workplaceId}/>
        <hr/>
        <ScheduledStackListTable scheduledStacks={scheduledStacks} />
      </div>
    </div>
  );
}