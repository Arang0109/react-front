import useFormEditor from 'shared/hooks/useFormEditor';
import { validateCompany } from 'features/company/lib/validateCompany';

export default function useCompanyEditor(initialData = {}) {
  return useFormEditor(initialData, validateCompany);
}