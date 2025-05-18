// import { useEffect, useState } from 'react';

import { useScheduleDataStore } from 'features/schedule';

export default function BasicInformation({ LOCAL_KEY }) {
  const { measurementDataMap } = useScheduleDataStore();

  return(
    <div>
      <button onClick={() => {
        console.log(measurementDataMap[LOCAL_KEY]);
      }}>
        test
      </button>
    </div>
  );
}