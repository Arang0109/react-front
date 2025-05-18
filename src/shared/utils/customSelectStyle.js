export default function customSelectStyle() {
  const singleStyle = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "rgb(82, 67, 170)" : "black", // 선택된 옵션 색상
      backgroundColor: state.isSelected
      ? "rgb(82, 67, 170, 0.1)" // ✅ 선택된 항목 배경색
      : state.isFocused
      ? "rgb(82, 67, 170, 0.1)" // ✅ hover or focus 상태 배경색
      : "white",
      fontSize: "0.75rem"
    }),
    SingleValue: (provided) => ({
      ...provided,
      color: "rgb(51, 51, 51)",
    }),
    input: (provided) => ({
      ...provided,
      color: "black",
    }),
    groupHeading: (base) => ({
      ...base,
      backgroundColor: "rgb(82, 67, 170, 0.1)",  // 원하는 배경색
      color: "rgb(51, 51, 51)",               // 텍스트 색상
    }),
  };

  const multiStyle = {
    option: (provided, state) => ({
      ...provided,
      color: state.selected ? "white" : "black",
      backgroundColor: state.isFocused ? "rgb(82, 67, 170, 0.1)" : "white",
      fontSize: "0.75rem"
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "rgb(82, 67, 170)",
      backgroundColor: "rgb(82, 67, 170, 0.1)",
    }),
    MultiValue: (provided) => ({
      ...provided,
      color: "rgb(82, 67, 170)",
      backgroundColor: "rgb(82, 67, 170, 0.1)",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "rgb(82, 67, 170)",
      backgroundColor: "rgb(82, 67, 170, 0.1)",
    }),
    input: (provided) => ({
      ...provided,
      color: "black",
    }),
    groupHeading: (base) => ({
      ...base,
      backgroundColor: "rgb(82, 67, 170, 0.1)",  // 원하는 배경색
      color: "rgb(82, 67, 170)",    
      fontSize: "1rem",
      fontWeight: "bold",    // 텍스트 색상
    }),
  };

  return {
    singleStyle,
    multiStyle,
  };
}