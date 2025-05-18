import { useState } from "react";

export default function useEditModeToggle(data, validate, onUpdate) {
  const [readOnly, setReadOnly] = useState(true);
  const [buttonText, setButtonText] = useState("수정");

  const handleModify = async () => {
    if (readOnly) {
      setReadOnly(false);
      setButtonText("저장");
      return;
    }

    if (!validate()) return;

    try {
      await onUpdate(data);
      alert("수정되었습니다!");
      setReadOnly(true);
      setButtonText("수정");
    } catch (error) {
      alert("수정에 실패했습니다.");
    }
  };

  return {
    readOnly,
    buttonText,
    handleModify,
  };
}
