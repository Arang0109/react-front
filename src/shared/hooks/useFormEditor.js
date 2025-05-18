// src/shared/hooks/useFormEditor.js
import { useEffect, useState, useRef } from 'react';
import { isEqual } from 'lodash';

export default function useFormEditor(initialData = {}, validateFn = () => ({})) {
  const [form, setForm] = useState(initialData);
  const [errors, setErrors] = useState({});
  const initialRef = useRef(initialData);

  useEffect(() => {
    if (!isEqual(initialRef.current, initialData)) {
      setForm(initialData);
      initialRef.current = initialData;
    }
  }, [initialData]);

  const validate = () => {
    if (typeof validateFn !== 'function') {
      console.warn("validateFn is not a function", validateFn);
      return true;
    }
    
    const validation = validateFn(form);
    setErrors(validation);
    return Object.keys(validation).length === 0;
  };

  const reset = () => {
    setForm(initialRef.current);
    setErrors({});
  };

  return {
    form,
    setForm,
    errors,
    validate,
    reset,
  };
}