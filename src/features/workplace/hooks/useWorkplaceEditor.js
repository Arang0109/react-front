import useFormEditor from 'shared/hooks/useFormEditor';
import { validateWorkplace } from 'features/workplace/lib/validateWorkplace';

export default function useWorkplaceEditor(initialData = {}) {
  return useFormEditor(initialData, validateWorkplace);
}