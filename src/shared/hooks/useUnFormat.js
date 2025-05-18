// shared/hooks/useUnformat.js
import { useCallback } from 'react';
import { formatters } from 'shared/utils/formatters';

export default function useUnformat(type) {
  return useCallback((value) => {
    const unformatter = formatters[type]?.unformat;
    return unformatter ? unformatter(value) : value;
  }, [type]);
}