import { useCallback } from 'react';

export default function useWorkplaceSizeFormat() {
  const format = useCallback((value) => {
    return value + '종';
  }, []);

  return format;
}