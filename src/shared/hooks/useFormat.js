// shared/hooks/useFormat.js
import { useCallback } from 'react';
import { formatters } from 'shared/utils/formatters';

export default function useFormat(type) {
  return useCallback((value) => {
    const formatter = formatters[type];
    return formatter ? formatter(value) : value;
  }, [type]);
}