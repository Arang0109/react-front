import useFormEditor from 'shared/hooks/useFormEditor';
import { validateStack } from 'features/stack/lib/validateStack';

export default function useStackEditor(initialData = {}) {
  return useFormEditor(initialData, validateStack);
}