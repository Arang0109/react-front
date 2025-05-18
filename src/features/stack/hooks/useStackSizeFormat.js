import { useCallback } from 'react';

export default function useStackSizeFormat() {
  const format = useCallback((value) => {
    return value + '종';
  }, []);

  return format;
}