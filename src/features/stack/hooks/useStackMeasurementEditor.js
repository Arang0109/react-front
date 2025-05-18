import useFormEditor from 'shared/hooks/useFormEditor';
import { validateStackMeasurement } from 'features/stack/lib/validateStackMeasurement';

export default function useStackMeasurementEditor(initialData = {}) {
  return useFormEditor(initialData, validateStackMeasurement);
}