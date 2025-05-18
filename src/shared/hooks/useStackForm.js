import { useEffect, useState } from 'react';

export default function useStackForm(initialData) {
  const [stack, setStack] = useState(initialData || {});
  const [errors, setErrors] = useState({});
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (initialData && !initialized) {
      setStack(initialData);
      setInitialized(true);
    }
  }, [initialData, initialized]);

  const validate = () => {
    const newErrors = {};
    if (!stack.stackName.trim()) {
      newErrors.stackName = '배출시설을 입력해주세요.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { stack, setStack, errors, validate };
}
