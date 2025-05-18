import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { SubScheduleListTable, ScheduleProfile } from 'features/schedule';
import { useSubScheduleStore } from 'features/schedule';

export default function SubSchedule() {
  const [searchParams] = useSearchParams();
  const groupedScheduleIds = searchParams.getAll('ids').map(Number);
  
  const subSchedules = useSubScheduleStore(state => state.subSchedules);
  const loadSubSchedules = useSubScheduleStore.getState().loadSubSchedules;
  const groupedScheduleKey = groupedScheduleIds.join(',');

  useEffect(() => {
    if (groupedScheduleIds.length > 0) {
      loadSubSchedules(groupedScheduleIds);
    }
  }, [groupedScheduleKey, loadSubSchedules]);
  return(
    <div className="container-fluid mt-4">
      <div className="border p-4" style={{
        backgroundColor: 'var(--bg-color)',
        color: 'var(--text-color)'
      }}>
        <ScheduleProfile subSchedules={subSchedules} />
        <p>측정대상 사업장 프로필 section</p>
        <p>Ex. 사업장 : 현대자동차(주) 울산공장</p>
        <p>Ex. 채취자 : 정우창, 신민석</p>
        <hr />
        <SubScheduleListTable subSchedules={subSchedules} />
      </div>
    </div>
  );
}