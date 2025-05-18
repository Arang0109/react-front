import { ScheduleListTable } from "features/schedule";

export default function Schedule() {
  return(
    <div className="container-fluid mt-4">
      <div className="border p-4" style={{
        backgroundColor: 'var(--bg-color)',
        color: 'var(--text-color)'
      }}>
        <h4 className="fw-bold">현장측정 분석목록 (대기)</h4>
        <hr/>
        <ScheduleListTable />
      </div>
    </div>
  );
}