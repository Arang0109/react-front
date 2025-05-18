import { useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';

export default function TestPage() {
  const [startTime, setStartTime] = useState(dayjs('00:00', 'HH:mm'));
  const [endTime, setEndTime] = useState(dayjs('00:00', 'HH:mm'));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['TimePicker']}>
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
      </DemoContainer>
    </LocalizationProvider>
  );
}