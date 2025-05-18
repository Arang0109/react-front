import useFormEditor from 'shared/hooks/useFormEditor';
import { validateSchedule } from 'features/schedule/lib/validateSchedule';

export default function useScheduleEditor(initialData = {}) {
  return useFormEditor(initialData, validateSchedule);
}